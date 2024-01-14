'use client'
import Image from "next/image"

import { globalState } from "@/components/providers/state-provider"
import { useContext } from "react"

import {
    Menu,
    MoreHorizontal,
    Phone,
    Video
} from "lucide-react"
import MobileToggle from "../mobile-toggle"
import CallButton from "./CallButton"



function ChatHead() {


    const { selectedChat } = useContext(globalState)


    return (
        <div className="bg-[#F1F2F7] flex gap-4 h-full justify-center items-center p-4">
            <MobileToggle />
            <div className="flex-1">
                <div className="flex gap-3 justify-start items-center text-center">
                    <Image
                        className="h-14 w-14 rounded-full"
                        height={64}
                        width={64}
                        src={"/customers/evil-rabbit.png"}
                        alt="chat"
                    />
                    <div>{selectedChat?.name}</div>
                </div>
            </div>
            <div className="flex pr-3 gap-5 justify-center items-center text-blue-500  ">

                <CallButton conversationId={selectedChat?.conversations?.[0]?.id as string} friendId={selectedChat?.id as string} />

                {/* <button className="mr-4 ">
                    <Video className="fill-blue-500" size={20} />
                </button> */}
                {/* <button>
                    <MoreHorizontal className="" />
                </button> */}

            </div>
        </div>
    )
}

export default ChatHead