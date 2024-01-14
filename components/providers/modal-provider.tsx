'use client'

import { AddFriendModal } from "@/components/modals/add-friend-modal"
import { DeleteMessageModal } from "@/components/modals/delete-message-modal"

import { useEffect, useState } from "react"
import { DeleteFriendModal } from "@/components/modals/delete-friend-modal"

function ModalProvider() {
    const [isMounted, setIsMounted] = useState<boolean>(false)


    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) {
        return (null)
    }

    return (
        <>
            <AddFriendModal />
            <DeleteMessageModal />
            <DeleteFriendModal />
        </>
    )
}

export default ModalProvider