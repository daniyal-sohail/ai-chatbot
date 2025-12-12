import { onUpdatePassword } from "@/actions/settings"
import { ChangePasswordProps, ChangePasswordSchema } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
export const useThemeMode = () => {
    const { theme, setTheme } = useTheme()
    return { theme, setTheme }
}

export const useChangePassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordProps>({
        resolver: zodResolver(ChangePasswordSchema as any)
    })
    const [loading, setLoading] = useState<boolean>(false)
    const onChangePassword = handleSubmit(async (values: ChangePasswordProps) => {
        try {
            setLoading(true)
            const updated = await onUpdatePassword(values.password)
            if (updated) {
                reset()
                setLoading(false)
                toast.success(updated.message)
            } else {
                toast.error('Failed to update password')
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    })


    return { register, handleSubmit, errors, onChangePassword, loading }
}