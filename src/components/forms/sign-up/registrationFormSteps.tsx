"use client"
import { useAuthContextHook } from '@/context/useAuthContext'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import SelectionFormType from './SelectionFormType'

const RegistrationFormSteps = ({ children }: { children: React.ReactNode }) => {

    const {
        register,
        formState: { errors },
        setValue,
    } = useFormContext()

    const { currentStep } = useAuthContextHook()
    const [onOTP, setOnOTP] = useState<boolean>(false)
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
                <DetailForm
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
            {children}
        </div>
    )
}
export default RegistrationFormSteps