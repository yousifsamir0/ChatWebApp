'use client'

import { cn } from "@/lib/utils";
import { useSocket } from "./providers/socket-provider"

function SocketStatus({ className }: { className?: string }) {

    const { isConnected } = useSocket();
    return (

        <div

            className={cn(
                "w-3 h-3 rounded-full border-background border-2",
                (isConnected) ? "bg-emerald-500" : "bg-rose-500",
                className
            )}
        />


    )
}

export default SocketStatus