import { onLoginUser } from '@/actions/auth'
import React from 'react'

const OwnerLayout = async ({ children }: { children: React.ReactNode }) => {
    const authenticated = await onLoginUser()
    if (!authenticated) return null

    return (
        <div>

        </div>
    )
}

export default OwnerLayout
