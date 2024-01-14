'use client';

import { createContext, useContext, useEffect, useState } from "react"
import { io as ClientSocket } from 'socket.io-client';


type SocketContextType = {
    socket: any;
    isConnected: boolean;
}


const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})

export const useSocket = () => useContext(SocketContext)

function SocketProvider({ children }: { children: React.ReactNode }) {

    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);


    useEffect(() => {
        // console.log("client created once")
        // console.log(`${process.env.NEXT_PUBLIC_SITE_URL}:3100`)
        const socketClient = new (ClientSocket as any)(`${process.env.NEXT_PUBLIC_ORIGIN}:3100`, {
            path: "/api/socket/io",
            addTrailingSlash: false
        })

        socketClient.on('connect', () => {
            setIsConnected(true)
            console.log('connected')
        });
        socketClient.on('disconnect', () => {
            setIsConnected(false)
            console.log('disconnect')
        });
        socketClient.on("connect_error", async (err: Error) => {
            console.log(`connect_error due to ${err.message}`)
            await fetch("/api/socket/io")
        })

        setSocket(socketClient);

        return () => {
            socketClient.disconnect()
        }

    }, [])


    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider