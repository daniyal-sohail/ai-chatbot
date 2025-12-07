'use client'
import ButtonHandler from '@/components/forms/sign-up/buttonHandler'
import SignUpFormProvider from '@/components/forms/sign-up/formProvider'
import HighLightBar from '@/components/forms/sign-up/highlightBar'
import RegistrationFormSteps from '@/components/forms/sign-up/registrationFormSteps'

import React from 'react'

type Props = {}

const SignUp = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 py-36 md:px-16 w-full">
            <div className="flex flex-col h-full gap-3">
                <SignUpFormProvider>
                    <div className="flex flex-col gap-3">
                        <RegistrationFormSteps />
                        <ButtonHandler />
                    </div>
                    <HighLightBar />
                </SignUpFormProvider>
            </div>
        </div>
    )
}

export default SignUp