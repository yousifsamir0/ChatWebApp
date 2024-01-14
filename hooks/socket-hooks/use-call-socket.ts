import { useSocket } from "@/components/providers/socket-provider"
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useCallSocket = () => {

    const { socket } = useSocket();
    const { data: session } = useSession();
    const key = `call:${session?.user?.id}`;


    useEffect(() => {
        socket.on(key, (user: User) => {

        })





        return () => {
            socket.off(key)
        }
    }, [])

}