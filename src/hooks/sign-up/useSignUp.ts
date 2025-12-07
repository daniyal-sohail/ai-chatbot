"use client"
import { toast } from "sonner"
import { useState } from "react"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { UserRegistrationSchema } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { onCompleteUserRegistration } from "@/actions/auth"

type UserRegistrationFormData = z.infer<typeof UserRegistrationSchema>

export const useSignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { signUp, isLoaded, setActive } = useSignUp()
    const router = useRouter()
    const methods = useForm<UserRegistrationFormData>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues: {
            type: "owner",
        },
        mode: "onChange",
    })

    const onGenerateOTP = async (
        email: string,
        password: string,
        onNext: React.Dispatch<React.SetStateAction<number>>
    ) => {
        if (!isLoaded) return

        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            onNext((prev) => prev + 1)
        } catch (error: any) {
            toast.error(error.errors[0].longMessage)
        }
    }

    const onHandleSubmit = methods.handleSubmit(
        async (values: UserRegistrationFormData) => {
            if (!isLoaded) return

            try {
                setLoading(true)
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: values.otp,
                })

                if (completeSignUp.status !== 'complete') {
                    return { message: 'Something went wrong!' }
                }

                if (completeSignUp.status == 'complete') {
                    if (!signUp.createdUserId) return

                    const registered = await onCompleteUserRegistration(
                        values.fullname,
                        signUp.createdUserId,
                        values.type
                    )

                    if (registered?.status == 200 && registered.user) {
                        await setActive({
                            session: completeSignUp.createdSessionId,
                        })

                        setLoading(false)
                        router.push('/dashboard')
                    }

                    if (registered?.status == 400) {
                        toast.error('Something went wrong!')
                    }
                }
            } catch (error: any) {
                toast.error(error.errors[0].longMessage)
            }
        }
    )

    return {
        methods,
        onHandleSubmit,
        onGenerateOTP,
        loading,
    }

}