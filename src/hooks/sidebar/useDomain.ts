
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadClient } from '@uploadcare/upload-client'
import { FieldValues, useForm } from 'react-hook-form'
import { AddDomainSchema } from '@/schemas/settingSchema'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { onIntegrateDomain } from '@/actions/settings'

const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useDomain = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
        resolver: zodResolver(AddDomainSchema as any)
    })

    const pathName = usePathname()
    const [loading, setLoading] = useState<boolean>(false)
    const [isDomain, setIsDomain] = useState<string | undefined>(undefined)
    const router = useRouter()

    useEffect(() => {
        setIsDomain(pathName.split('/').pop())
    }, [pathName])

    const onAddDomain = handleSubmit(async (values: FieldValues) => {
        setLoading(true)
        const uploaded = await upload.uploadFile(values.image[0])
        const domain = await onIntegrateDomain(values.domain, uploaded.uuid)
        if (domain) {
            reset()
            setLoading(false)
            toast.success(domain.message)
            router.refresh()
        }
    })

    return {
        register,
        onAddDomain,
        errors,
        loading,
        isDomain,
    }
}