import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser()
    if (user) {
        redirect("/")
    }
    return (
        <div className='h-screen flex w-full'>
            <div className='w-[600px] flex flex-col items-start p-6'>
                <Image src="/images/logo.png" sizes='100vw' alt="logo" width={0} height={0} style={{ width: '20%', height: 'auto' }} />
                {children}
            </div>

            <div className='flex flex-1 w-full max-h-full overflow-hidden relative bg-cream flex-col pt-10 pl-24'>
                <h2 className='text-gravel md:text-4xl font-bold'>Hi, I'm the AI Chatbot by DevXcript</h2>

                <p className='text-iridium md:text-sm mb-10'>I'm here to help you with your questions and provide
                    <br /> you with the information you need.
                </p>

                <Image src="/images/random.png" sizes='30' alt="auth-image" width={0} height={0} loading='lazy' className='absolute shrink-0 !w-[1600px] top-48' />
            </div>

        </div>
    );
};

export default Layout;
