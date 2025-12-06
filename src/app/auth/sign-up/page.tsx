import SignUpFormProvider from '@/components/forms/sign-up/formProvider'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

const SignUp = ({ children = null }: Props) => {
    return (
        <div className="flex-1 py-36 md:px-16 w-full">
            <div className="flex flex-col h-full gap-3">
                <SignUpFormProvider>
                    {children}
                </SignUpFormProvider>
            </div>
        </div>
    )
}

export default SignUp