"use client"
import { useAuthContextHook } from '@/context/useAuthContext'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import SelectionFormType from './selectionFormType'

import { Spinner } from '@/components/spinner'
import dynamic from 'next/dynamic'

const LoadingSpinner = () => <Spinner />

const AccountDetailsForm = dynamic(() => import('./accountDetailForm'), {
    ssr: false,
    loading: LoadingSpinner,
})

const OTPForm = dynamic(() => import('./otpForm'), {
    ssr: false,
    loading: LoadingSpinner,
})


const RegistrationFormSteps = () => {

    const {
        register,
        formState: { errors },
        setValue,
    } = useFormContext()

    const { currentStep } = useAuthContextHook()
    const [onOTP, setOnOTP] = useState<string>('')
    const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

    setValue('otp', onOTP)

    switch (currentStep) {
        case 1:
            return (
                <SelectionFormType
                    register={register}
                    userType={onUserType}
                    setUserType={setOnUserType}
                />
            )
        case 2:
            return (
                <AccountDetailsForm
                    errors={errors}
                    register={register}
                />
            )
        case 3:
            return (
                <OTPForm
                    onOTP={onOTP}
                    setOTP={setOnOTP}
                />
            )
    }


    return (
        <div>
            <h1>Registration Form Steps</h1>
        </div>
    )
}
export default RegistrationFormSteps