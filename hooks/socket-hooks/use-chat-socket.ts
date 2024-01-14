import { useSocket } from "@/components/providers/socket-provider"
import { MessagesWithCursor } from "@/types/ReturnTypes";
import { MessageWithSender } from "@/types/extendedModels";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface useChatSocketProps {
    updateKey?: string;
    addKey: string;
    queryKey: string;
}

export const useChatSocket = ({
    updateKey,
    addKey,
    queryKey,
}: useChatSocketProps) => {

    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on(addKey, (message: MessageWithSender) => {
            // queryClient.setQueryData([queryKey], (oldData: InfiniteData<MessagesWithCursor>) => {

            //     if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            //         return {
            //             pages: [
            //                 {
            //                     messages: [message],
            //                 }
            //             ]
            //         }
            //     }
            //     const newData = [...oldData.pages]
            //     newData[0] = {
            //         ...newData[0],
            //         messages: [
            //             message,
            //             ...newData[0].messages
            //         ]
            //     };

            //     return {
            //         ...oldData,
            //         pages: newData
            //     }
            // })
            queryClient.refetchQueries({ queryKey: [queryKey] })
        })
        return () => {
            socket.off(addKey);
        }
    })


}