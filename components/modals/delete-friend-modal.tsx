"use client";

import axios from "axios";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/modal-store";
import { Button } from "@/components/ui/button";
import { usefriendListQuery } from "@/hooks/query/use-friendlist";

export const DeleteFriendModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "deleteFriend";
    const { friendId, conversationId } = data;

    const [isLoading, setIsLoading] = useState(false);
    const { refetch } = usefriendListQuery()

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/socket/friendrequest/${friendId}`,
                {
                    params: {
                        conversationId
                    }
                });
            onClose();
            refetch()
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Friend
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        All messages will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            className="bg-blue-500 hover:bg-blue-600"
                            onClick={onClick}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}