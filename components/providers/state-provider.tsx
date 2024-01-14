'use client'

import { FriendWithConversation } from "@/types/extendedModels";
import { Dispatch, SetStateAction, createContext, useState } from "react";


type SelectedChatType = FriendWithConversation | null;

interface GlobalState {
    selectedChat: SelectedChatType;
    setSelectedChat: Dispatch<SetStateAction<SelectedChatType>>;
}

export const globalState = createContext<GlobalState>({
    selectedChat: null,
    setSelectedChat: (() => { }),
})

export const StateProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedChat, setSelectedChat] = useState<SelectedChatType>(null);

    return (
        <globalState.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </globalState.Provider>
    );
}