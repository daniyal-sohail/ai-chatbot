import { AuthContextProvider } from '@/context/useAuthContext'

type Props = {
    children: React.ReactNode
}

function SignUpFormProvider({ children }: Props) {
    return <AuthContextProvider>{children}</AuthContextProvider>
}

export default SignUpFormProvider