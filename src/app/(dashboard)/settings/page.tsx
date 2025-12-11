import DarkModeToggle from '@/components/dark-mode'
import InfoBar from '@/components/infobar'
import BillingSettings from '@/components/settings/billingSettings'
import React from 'react'

type Props = {}
const SettingsPage = (props: Props) => {
    return (
        <div>
            <InfoBar />
            <div className="overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10">
                <BillingSettings />
                <DarkModeToggle />
            </div>
        </div>
    )
}
export default SettingsPage
