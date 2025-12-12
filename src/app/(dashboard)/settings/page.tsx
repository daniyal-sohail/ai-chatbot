import DarkModeToggle from '@/components/dark-mode'
import InfoBar from '@/components/infobar'
import BillingSettings from '@/components/settings/billingSettings'
import ChangePassword from '@/components/settings/changePassword'
import React, { Suspense } from 'react'

type Props = {}
const SettingsPage = (props: Props) => {
    return (
        <div className="flex flex-col h-full">
            <InfoBar />
            <div className="overflow-y-auto w-full chat-window flex-1 flex flex-col gap-10 p-4">
                <Suspense fallback={<div className="text-muted-foreground">Loading billing settings...</div>}>
                    <BillingSettings />
                </Suspense>
                <DarkModeToggle />
                <ChangePassword />
            </div>
        </div>
    )
}
export default SettingsPage
