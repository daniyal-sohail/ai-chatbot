import { onGetSubscriptionPlan } from '@/actions/settings'
import React from 'react'
import Section from '../section-label'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Check, CheckCircle2, Plus } from 'lucide-react'
import { pricingCards } from '@/constants/landingPage'
// import SubscriptionForm from '../forms/settings/subscription-form'
import Image from 'next/image'
import Modal from '../modal'

type Props = {}

const BillingSettings = async (props: Props) => {
    const plan = await onGetSubscriptionPlan()
    const planFeatures = pricingCards.find(
        (card: any) => card.title.toUpperCase() === plan?.toUpperCase()
    )?.features

    // If plan not found, show a default message or use first plan as fallback
    if (!planFeatures) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-1">
                    <Section
                        label="Billing settings"
                        message="Add payment information, upgrade and modify your plan."
                    />
                </div>
                <div className="lg:col-span-4">
                    <p className="text-muted-foreground">
                        {plan ? `Plan "${plan}" not found. Please contact support.` : 'No subscription plan found.'}
                    </p>
                </div>
            </div>
        )
    }

    console.log(planFeatures)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-1">
                <Section
                    label="Billing settings"
                    message="Add payment information, upgrade and modify your plan."
                />
            </div>
            <div className="lg:col-span-2 flex justify-start lg:justify-center ">
                <Modal
                    children={<div>Hello</div>}
                    title="Choose A Plan"
                    description="Tell us about yourself! What do you do? Let’s tailor your experience so it best suits you."
                    trigger={
                        plan && plan === 'STANDARD' ? (
                            <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
                                <CardContent className="flex gap-2 items-center">
                                    <div className="rounded-full border-2 p-1">
                                        <Plus className="text-gray-400" />
                                    </div>
                                    <CardDescription className="font-semibold">
                                        Upgrade Plan
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ) : (
                            <Image
                                src="/images/creditcard.png"
                                width={400}
                                height={400}
                                alt="image"
                            />
                        )
                    }
                >
                    {/* <SubscriptionForm plan={plan!} /> */}
                </Modal>
            </div>
            <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
                <p className="text-sm font-semibold">{plan}</p>
                <div className="flex gap-2 flex-col mt-2">
                    {planFeatures.map((feature: any) => (
                        <div
                            key={feature}
                            className="flex gap-2"
                        >
                            <CheckCircle2 className="text-muted-foreground" />
                            <p className="text-muted-foreground">{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BillingSettings