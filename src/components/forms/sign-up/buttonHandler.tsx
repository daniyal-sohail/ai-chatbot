"use client"

import { useAuthContextHook } from "@/context/useAuthContext"
import { useSignUpForm } from "@/hooks/sign-up/useSignUp"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {}

const ButtonHandler = (props: Props) => {
    const { setCurrentStep, currentStep } = useAuthContextHook()
    const { formState, getFieldState, getValues } = useFormContext()
    const { onGenerateOTP } = useSignUpForm()


    const { isDirty: isName } = getFieldState('fullname', formState)
    const { isDirty: isEmail } = getFieldState('email', formState)
    const { isDirty: isPassword } = getFieldState('password', formState)

    if (currentStep === 3) {
        return (
            <div className="w-full flex flex-col gap-3 items-center">
                <Button
                    type="submit"
                    className="w-full"
                >
                    Create an account
                </Button>
                <p>
                    Already have an account?
                    <Link
                        href="/auth/sign-in"
                        className="font-bold"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        )
    }

    if (currentStep === 2) {
        return (
            <div className="w-full flex flex-col gap-3 items-center">
                <Button
                    type="button"
                    className="w-full"
                    onClick={(e) => {
                        e.preventDefault()
                        if (isName && isEmail && isPassword) {
                            onGenerateOTP(
                                getValues('email'),
                                getValues('password'),
                                setCurrentStep
                            )
                        }
                    }}
                >
                    Continue
                </Button>
                <p>
                    Already have an account?{' '}
                    <Link
                        href="/auth/sign-in"
                        className="font-bold"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-3 items-center">
            <Button
                type="button"
                className="w-full"
                onClick={(e) => {
                    e.preventDefault()
                    setCurrentStep((prev: number) => prev + 1)
                }}
            >
                Continue
            </Button>
            <p>
                Already have an account?{' '}
                <Link
                    href="/auth/sign-in"
                    className="font-bold"
                >
                    Sign In
                </Link>
            </p>
        </div>
    )
}

export default ButtonHandler