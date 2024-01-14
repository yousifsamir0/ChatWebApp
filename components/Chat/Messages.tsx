'use client';


import { cn } from "@/lib/utils"
import { globalState } from "@/components/providers/state-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Loader2, Trash } from "lucide-react";

import { useSession } from "next-auth/react";
import { ElementRef, Fragment, useContext, useEffect, useRef, useState } from "react";
import { useChatQuery } from "@/hooks/use-chat-query";
import { MessageWithSender } from "@/types/extendedModels";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { MessagesWithCursor } from "@/types/ReturnTypes";
import { useChatSocket } from "@/hooks/socket-hooks/use-chat-socket";

import { format } from "date-fns";
import { ToolTip } from "../tool-tip";
import { useModal } from "@/hooks/modal-store";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface MessageProps {
    message: MessageWithSender;
    isMine: boolean; //todo to know how is mine 
}


function Messages() {

    const { data: session } = useSession();
    const { selectedChat } = useContext(globalState);

    const queryKey = `chat:${selectedChat?.conversations[0].id}:messages`
    const addKey = `chat:${selectedChat?.conversations[0].id}:messages`

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey: [queryKey],
        apiUrl: "/api/messages",
        chatId: selectedChat?.conversations[0].id as string
    })

    useChatSocket({
        addKey,
        queryKey,
    })

    const topDivRef = useRef<ElementRef<'div'>>(null)
    const bottomDivRef = useRef<ElementRef<'div'>>(null)

    useChatScroll({
        topDivRef,
        bottomDivRef,
        shouldLoadMore: (!!hasNextPage && !isFetchingNextPage),
        isLoadingMore: isFetchingNextPage,
        loadMore: fetchNextPage,
        pages: data?.pages as MessagesWithCursor[],
    })




    if (status === 'pending') {
        return (
            <div className="flex flex-col gap-2 justify-center items-center">
                <Loader2 className="animate-spin w-7 h-7 text-blue-500" />
                <p className="text-xs text-muted-foreground">Loading messages...</p>
            </div>
        )
    }
    if (status === 'error') {
        return (
            <div>
                Something went wrong
            </div>
        )
    }
    return (
        <ScrollArea
            ref={topDivRef}
            className='px-6 py-4 flex-1 h-full w-full flex flex-col overflow-y-auto '
        >
            {hasNextPage && isFetchingNextPage && (
                <div className="flex flex-col justify-center items-center">
                    <Loader2 className="size-6 animate-spin text-blue-500" />
                    <p className="text-sm text-muted-foreground">loading older messages...</p>
                </div>
            )}
            <div className="flex flex-col-reverse ">
                {
                    data?.pages.map((page, i) => (

                        <Fragment key={i}>
                            {
                                page.messages.map((message) => (
                                    <Message key={message.id} message={message} isMine={session?.user?.id === message.senderId} />
                                ))
                            }
                        </Fragment>
                        // <Message key={message.id} message={message} />
                    ))
                }
            </div>
            <div ref={bottomDivRef} />
        </ScrollArea>
    )
}



function Message({ message, isMine }: MessageProps) {

    const { onOpen } = useModal();

    return (
        <div
            className={cn("max-w-xl  px-4  self-start ", (isMine && "self-end flex-row-reverse"),
                "flex justify-center gap-2 items-center group")}
        >

            {isMine && (
                <ToolTip label="delete" side="top" align="start">
                    <button onClick={() => onOpen("deleteMessage", { messageId: message.id })}>
                        <Trash className="text-rose-500 size-4 opacity-0 group-hover:opacity-100" />
                    </button>
                </ToolTip>
            )}
            <div
                className={cn("max-w-xl my-2 px-4 py-3 rounded-3xl bg-gray-300",
                    (isMine && "bg-blue-500 text-white"),
                )}
            >
                <p>{message.content}</p>
            </div>
            <p className="hidden group-hover:block text-xs text-muted-foreground">{format(message.timestamp, DATE_FORMAT)}</p>
        </div>
    )
}


export default Messages