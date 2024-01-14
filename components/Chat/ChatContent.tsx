'use client';

import InputField from './InputField'
import Messages from './Messages'


function ChatContent() {

    return (
        <div className='flex  flex-col h-full bg-[#F5F6FA] justify-center items-center'>
            <div className='flex-1 min-h-0  w-full flex justify-center items-center'>
                <Messages />
            </div>
            <InputField />
        </div>
    )
}

export default ChatContent