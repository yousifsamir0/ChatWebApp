'use client'
import SideSearch from './SideSearch'
import SideItems from './SideItems'
import SideHead from './SideHead'
import { UserPlus2 } from 'lucide-react'
import { useModal } from '@/hooks/modal-store'
import { useFriendSocket } from '@/hooks/socket-hooks/use-friends-socket'
import { ToolTip } from '../tool-tip'


function SidePanel() {
    const { onOpen } = useModal()
    useFriendSocket()

    return (
        <div className='pr-2 flex flex-col h-full w-full'>
            <div className='h-24'>
                <SideHead />
            </div>
            <div className=' flex-1 min-h-0  '>
                <div className='flex flex-col gap-1 bg-white h-full py-6 rounded-3xl '>
                    <div className='px-4 h-14 flex justify-center items-start'>
                        <div className='flex justify-center items-center w-full gap-5'>
                            <SideSearch />
                            <ToolTip label='add friends' side='top'>
                                <button
                                    onClick={() => { onOpen('AddFriend') }}
                                    className='w-9 h-9 rounded-full bg-[#F5F6FA] flex justify-center items-center'
                                >
                                    <UserPlus2 className='text-blue-500' />
                                </button>
                            </ToolTip>
                        </div>
                    </div>
                    <div className='flex-1 min-h-0   h-full flex flex-col gap-0.5 justify-start items-center '>
                        <SideItems />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SidePanel