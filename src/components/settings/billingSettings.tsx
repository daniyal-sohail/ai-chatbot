import { onGetSubscriptionPlan } from '@/actions/settings'
import React from 'react'

const BillingSettings = async () => {

    const plan = await onGetSubscriptionPlan()
    return (
        <div>
            Billing Settings
        </div>
    )
}

export default BillingSettings
