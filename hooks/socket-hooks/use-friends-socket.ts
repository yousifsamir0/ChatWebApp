import { useSocket } from "@/components/providers/socket-provider"
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useFriendSocket = () => {

    const { socket } = useSocket();
    const queryClient = useQueryClient()

    const { data: session } = useSession()
    const id = session?.user?.id || ''

    const friendListQK = 'friendList';
    const requestsQK = 'incomingFR';

    const frienListEventKey = `freinds:${id}`;
    const requestsCreateKey = `request:${id}`;
    const requestsAcceptKey = `request:${id}:accept`;
    const requestsDeclineKey = `request:${id}:decline`;



    useEffect(() => {
        socket.on(frienListEventKey, () => {
            queryClient.refetchQueries({ queryKey: [friendListQK] })
        })
        socket.on(requestsAcceptKey, () => {
            queryClient.refetchQueries({ queryKey: [friendListQK] })
            queryClient.refetchQueries({ queryKey: [requestsQK] })

        })
        socket.on(requestsDeclineKey, () => {
            queryClient.refetchQueries({ queryKey: [requestsQK] })
        })
        socket.on(requestsCreateKey, () => {
            queryClient.refetchQueries({ queryKey: [requestsQK] })
        })




        return () => {
            socket.off(frienListEventKey)
            socket.off(requestsAcceptKey)
            socket.off(requestsDeclineKey)
            socket.off(requestsCreateKey)
        }
    }, [])

}