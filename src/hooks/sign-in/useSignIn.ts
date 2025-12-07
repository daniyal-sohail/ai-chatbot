'use client'
import { toast } from 'sonner'
import { UserLoginSchema } from '@/schemas/authSchema'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type UserLoginFormData = z.infer<typeof UserLoginSchema>

export const useSignInForm = () => {
    const { isLoaded, setActive, signIn } = useSignIn()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const methods = useForm<UserLoginFormData>({
        resolver: zodResolver(UserLoginSchema as any),
        mode: 'onChange',
    })
    const onHandleSubmit = methods.handleSubmit(
        async (values: UserLoginFormData) => {
            if (!isLoaded) return

            try {
                setLoading(true)
                const authenticated = await signIn.create({
                    identifier: values.email,
                    password: values.password,
                })

                if (authenticated.status === 'complete') {
                    await setActive({ session: authenticated.createdSessionId })
                    setLoading(false)
                    toast.success('Welcome back!')
                    router.push('/dashboard')
                }
            } catch (error: any) {
                setLoading(false)
                if (error?.errors?.[0]?.code === 'form_password_incorrect') {
                    toast.error('Email/password is incorrect. Please try again.')
                } else {
                    toast.error(error?.errors?.[0]?.longMessage || 'An error occurred. Please try again.')
                }
            }
        }
    )

    return {
        methods,
        onHandleSubmit,
        loading,
    }
}