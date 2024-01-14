'use client';

import ChatMain from '@/components/Chat/ChatMain'
import SidePanel from '@/components/sidepanel/SidePanel'
import { usefriendListQuery } from '@/hooks/query/use-friendlist';

import { LayoutDashboard } from 'lucide-react';




function page() {


    const {
        isPending,
    } = usefriendListQuery();



    if (isPending) {
        return (
            <div className='flex flex-col justify-center items-center space-y-8'>

                <LayoutDashboard className='animate-pulse text-muted-foreground size-10' />
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-lg animate-pulse'>Chat Web App</h1>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='hidden md:flex md:w-[400px] w-4/12 h-full'>
                <SidePanel />
            </div>
            <div className='flex-1 min-w-0 h-full'>
                <ChatMain />
            </div>
        </>
    )
}

export default page