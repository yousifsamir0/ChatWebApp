'use client'
import { Fragment, useContext, useEffect } from "react"
import ChatContent from "./ChatContent"
import ChatHead from "./ChatHead"
import { globalState } from "../providers/state-provider"

function ChatMain() {

    const { selectedChat } = useContext(globalState)

    return (
        <div className='h-full flex flex-col justify-center items-center'>
            {!selectedChat ? (
                <div>
                    todo initial page before select conversation
                </div>
            ) :
                (
                    <Fragment key={selectedChat.id}>

                        <div className=' h-24 w-full '>
                            <ChatHead />
                        </div>
                        <div className='w-full   flex-1 min-h-0  '>
                            <ChatContent />
                        </div>

                    </Fragment>
                )}
        </div>
    )
}

export default ChatMain