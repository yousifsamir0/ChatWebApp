'use client'

import { Bell, LogOut, UserPlus } from "lucide-react"
import Image from "next/image"
import SocketStatus from "@/components/socket-status"
import FriendRequests from "./FriendRequests"
import { signOut, useSession } from "next-auth/react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function SideHead() {

    const { data: session } = useSession()

    return (
        <div className="pb-5 w-full h-full flex items-center justify-between gap-1  rounded-xl ">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="flex gap-3 rounded-xl hover:bg-white py-2 px-5 ">
                        <div className="w-11 h-11  relative">
                            <div className="rounded-full overflow-hidden">
                                <Image
                                    height={64}
                                    width={64}
                                    alt="profile image"
                                    src={'/customers/evil-rabbit.png'}
                                />
                            </div>
                            <SocketStatus className="absolute bottom-0 right-0" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="font-semibold" >{session?.user?.name}</div>
                            <div className="text-sm font-medium text-gray-500">@joeSamir</div>
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" >
                    <DropdownMenuItem >
                        <button
                            onClick={() => signOut()}
                            className="flex justify-between w-full"
                        >
                            <p>Logout</p>
                            <LogOut className="text-rose-500" />
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


            <div className="space-x-1 flex ">
                <div>
                    <FriendRequests />
                </div>
                {/* <button>
                    <Bell className="text-gray-300" />
                </button> */}
            </div>

        </div>
    )
}

export default SideHead