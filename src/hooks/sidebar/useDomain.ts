
import { onIntegrateDomain } from '@/actions/settings'
import { useToast } from '@/components/ui/use-toast'
import { AddDomainSchema } from '@/schemas/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadClient } from '@uploadcare/upload-client'
import { usePathname, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useDomain = () => {


    return {

    }
}