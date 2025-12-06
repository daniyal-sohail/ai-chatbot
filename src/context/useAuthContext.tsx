"use client"
import { ReactNode, Dispatch, createContext, useContext } from "react"

type InitialValuesProps = {
    currentStep: number
    setCurrentStep: Dispatch<React.SetStateAction<number>>
}

const InitialValues: InitialValuesProps = {
    currentStep: 1,
    setCurrentStep: () => undefined
}

const authContext = createContext(InitialValues)

const { Provider } = authContext

export const AuthContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    return <Provider value={InitialValues}>{children}</Provider>
}

export const useAuthContextHook = () => {
    const state = useContext(authContext)
    return state
}