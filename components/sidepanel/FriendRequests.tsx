'use client';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Loader2, Users2 } from "lucide-react"
import FriendRequestItem from "./friendRequest/FriendRequestItem";
import { Separator } from "@/components/ui/separator";
import { useIncomingRequests } from "@/hooks/query/use-incomingFR";
import { usefriendListQuery } from "@/hooks/query/use-friendlist";
import { ToolTip } from "../tool-tip";

function FriendRequests() {

    const {
        data,
        isPending,
        refetch: refetchRequests,
    } = useIncomingRequests();
    const { refetch: refetchFriendList } = usefriendListQuery()

    return (
        <Popover>
            <PopoverTrigger >
                <ToolTip label="incoming requests" side="bottom" align="center">

                    <div className="relative size-10   flex justify-center items-center ">
                        <div className="bg-white hover:bg-black group rounded-full size-10 flex justify-center items-center">
                            <Users2 className=" text-black group-hover:text-white  " />
                        </div>
                        {!!data?.length &&
                            (
                                <div className="absolute bottom-0 right-1 size-2 bg-rose-500 rounded-full text-white flex justify-center items-center text-sm p-2 " >
                                    {data?.length}
                                </div>
                            )
                        }
                    </div>
                </ToolTip>
            </PopoverTrigger>
            <PopoverContent className=" w-80  flex flex-col justify-center items-center" >
                <>
                    <h1 className="text-xl">Friend Requests</h1>
                    <Separator className="my-2" />
                    {isPending && (
                        <Loader2 className="text-blue-500 animate-spin size-5" />
                    )}
                    {data && (
                        data.map((frUser) => (
                            <FriendRequestItem
                                key={frUser.id}
                                user={frUser}
                                refresh={() => { refetchRequests(); refetchFriendList(); }}
                            />
                        ))
                    )}
                    {!data?.length && (
                        <div className="mt-3">
                            No one care about you :(
                        </div>
                    )}
                </>
            </PopoverContent>
        </Popover>
    )
}

export default FriendRequests