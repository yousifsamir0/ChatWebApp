"use client";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/modal-store";
import { ScrollArea } from "../ui/scroll-area";

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { searchUser } from "@/lib/actions/auth/searchUsers";

import { Frown, Loader2, Search, SearchX } from "lucide-react";

import UserSearchItem from "./addFriend/userSearchItem";
import { useToast } from "../ui/use-toast";
import { useDebouncedCallback } from 'use-debounce';
import { UserPublic } from "@/types/extendedModels";






export const AddFriendModal = () => {

    const { type, isOpen, onClose } = useModal();
    const isModalOpen = isOpen && type === "AddFriend";


    const [users, setUsers] = useState<UserPublic[] | null>([])
    const [query, setQuery] = useState<string>("");
    const [trigger, setTrigger] = useState<boolean>(false)
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const debouncedCallback = useDebouncedCallback((callBack) => { callBack() }, 200);


    const { toast } = useToast();

    useEffect(() => {

        const search = async () => {

            if (query) {
                setIsSearching(true)
                const response = await searchUser(query);
                if (response.error) {
                    toast({
                        variant: "destructive",
                        title: "Failed",
                        description: `${response.error}`
                    })
                }
                setUsers(response.queryUsers);
                setIsSearching(false)
            }
            if (query === "") {
                setUsers([])
            }
        }

        if (trigger) {
            search()
            setTrigger(false);
        }
        else if (!isSearching)
            debouncedCallback(search);

        return () => { }

    }, [query, trigger])

    const handleClose = () => {
        setQuery("");
        onClose();
    }


    return (

        <Dialog open={isModalOpen} onOpenChange={handleClose}  >
            <DialogContent className="bg-white text-black overflow-hidden w-[420px] dragHandle">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-lg text-center">
                        Add New Friends
                    </DialogTitle>
                    <DialogDescription
                        className="text-center text-zinc-500"
                    >
                        search by username or email
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                    <div className="relative text-gray-400">
                        <Input
                            className="focus-visible:ring-blue-500"
                            value={query}
                            placeholder="Username or Email"
                            onChange={e => setQuery(e.target.value)}
                        />
                        {isSearching && (<Loader2 className="absolute right-2 bottom-2 animate-spin" />)}
                        {!isSearching && (<Search className="absolute right-2 bottom-2" />)}
                    </div>
                    <ScrollArea className="mt-8 max-h-[420px] flex flex-col justify-center items-center ">
                        {users && (
                            users.map((user) => (
                                <UserSearchItem key={user.id} trigger={() => { setTrigger(true) }} user={user} />
                            ))
                        )}
                        {!users &&
                            (
                                <div className="flex flex-col gap-2 justify-center items-center bg-[#F5F6FA] py-4 rounded-md">
                                    <div >
                                        <Frown className="size-7 text-gray-500" />
                                    </div>
                                    <h1>Sorry, we could not find any results!</h1>
                                </div>
                            )
                        }
                        {!users?.length && users &&
                            (
                                // todo:
                                <div></div>
                            )
                        }


                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}