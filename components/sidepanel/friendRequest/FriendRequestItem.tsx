'use client';

import { Check, Loader2, X } from "lucide-react";
import { User } from "@prisma/client";
import { useState } from "react";

import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

function FriendRequestItem({ user, refresh }: { refresh: () => void, user: Omit<User, 'password'> }) {


    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast();

    const handleAcceptFriend = async (user: Omit<User, 'password'>) => {
        try {
            setIsLoading(true)
            const res = await axios.post('/api/socket/friendrequest/accept', { id: user?.id })
            toast({
                title: "Success !",
                description: `${user.name} and you are friends now`
            })
        }
        catch (error) {
            toast({
                variant: "destructive",
                title: "Accept Failed!",
                description: `Error:${error}`
            })
        }
        finally {
            refresh()
            setIsLoading(false)

        }
    }

    const handleDeclineFriend = async (user: Omit<User, 'password'>) => {
        try {
            setIsLoading(true)
            const res = await axios.post('/api/socket/friendrequest/decline', { id: user?.id })

        }
        catch (error) {
            toast({
                title: "Decline Failed!",
                description: `Error:${error}`
            })
        }
        finally {
            refresh()
            setIsLoading(false)
        }
    }



    return (

        <div key={user.id} className="flex h-16 px-2 rounded-3xl  w-full justify-between items-center select-none bg-[#F5F6FA]">
            <div className="flex justify-center items-center">
                <div className="size-10 rounded-full overflow-hidden mr-4">
                    <Image
                        height={100}
                        width={100}
                        src={'/customers/evil-rabbit.png'}
                        alt="sss"
                    />
                </div>
                <div className="flex-1 text-sm ">{user.name}</div>

            </div>
            {isLoading ? (
                <Loader2 className="size-5 text-blue-500 animate-spin" />
            ) : (
                <div className="flex space-x-2">
                    <button
                        disabled={isLoading}
                        onClick={() => handleDeclineFriend(user)}
                        className="w-9 h-9 rounded-full relative flex justify-center items-center bg-rose-500 hover:scale-105 transition"
                    >
                        <X className="size-5 text-white" />
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => handleAcceptFriend(user)}
                        className="w-9 h-9 rounded-full relative flex justify-center items-center  bg-blue-500 hover:scale-105 transition"
                    >
                        <Check className="size-5 text-white " />
                    </button>
                </div>
            )}

        </div>


    )
}

export default FriendRequestItem