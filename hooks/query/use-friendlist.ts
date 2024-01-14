import { globalState } from "@/components/providers/state-provider";
import { FriendWithConversation } from "@/types/extendedModels";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axios from "axios";




export const usefriendListQuery = () => {


    const { setSelectedChat } = useContext(globalState)

    const store = useQuery({
        queryKey: ['friendList'],
        queryFn: async () => {
            const res = await axios.get('/api/users/friendlist')
            if (!store.data) {
                setSelectedChat(res.data[0])
            }
            return res.data as FriendWithConversation[]
        },
        staleTime: 1000 * 60 * 0.5, // 0.5 minute
        refetchOnWindowFocus: false
    });

    return store;
}


