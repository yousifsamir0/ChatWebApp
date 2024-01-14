'use client';
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area";
import { FriendWithConversation } from "@/types/extendedModels";
import { useContext } from "react";
import { globalState } from "@/components/providers/state-provider";

import { Loader, LucideAlertCircle, UserRoundX } from "lucide-react";
import { usefriendListQuery } from "@/hooks/query/use-friendlist";
import { cn } from "@/lib/utils";
import { ToolTip } from "../tool-tip";
import { useModal } from "@/hooks/modal-store";


interface SideItemProp {
    item: FriendWithConversation
}

function SideItems() {

    const {
        data,
        isPending,
        isError,
        error,
    } = usefriendListQuery()

    if (isPending) {
        return (
            <div>
                <Loader className="animate-spin text-blue-500" />
            </div>
        )
    }
    if (isError) {
        return (
            <div className="flex flex-col items-center">

                <LucideAlertCircle className="text-rose-500" />
                {error?.message}

                Something went wrong !
            </div>
        )
    }

    if (data)

        return (
            <ScrollArea className='w-full px-4 '>
                {data.map((item) => (
                    <SideItem key={item.id} item={item} />
                ))}
            </ScrollArea>
        )
}


function SideItem({ item }: SideItemProp) {
    const { selectedChat, setSelectedChat } = useContext(globalState)
    const { onOpen } = useModal()
    return (
        <div
            className={cn(
                "flex gap-3 w-full p-2 hover:bg-gray-400/5 rounded-2xl transition h-16 select-none cursor-pointer group",
                (selectedChat?.id === item.id) && "bg-blue-200 hover:bg-blue-200",
            )}
            onClick={() => { setSelectedChat(item) }}
        >
            <div className="w-11 h-11 rounded-full overflow-hidden" >
                <Image
                    height={100}
                    width={100}
                    alt="Avatar"
                    src={"/customers/amy-burns.png"}
                />
            </div>
            <div className="flex flex-col flex-1 ">
                <div className="font-semibold">{item.name}</div>
                <div className="text-muted-foreground truncate max-w-52">
                    {(item.conversations?.[0]?.messages.length) ? item.conversations[0].messages[0].content : "Start New Chat"}
                </div>
            </div>
            <div className="w-11 text-xs text-gray-700 flex flex-col gap-1 justify-center items-center">
                <p>02 Apr</p>
                <div className="flex justify-center items-center rounded-full size-7 opacity-0 group-hover:opacity-100  hover:bg-rose-200" >
                    <ToolTip label="remove friend" side="right" align="center">
                        <button onClick={() => {
                            onOpen("deleteFriend", {
                                friendId: item.id,
                                conversationId: item.conversations?.[0].id
                            })
                        }}
                        >
                            <UserRoundX className="text-rose-600 size-5" />
                        </button>
                    </ToolTip>
                </div>
            </div>
        </div>
    )
}

export default SideItems