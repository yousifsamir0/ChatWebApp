import { create } from 'zustand';


type ModalType = "AddFriend" | "deleteMessage" | "deleteFriend" | null

interface ModalData {
    messageId?: string;
    friendId?: string;
    conversationId?: string;
}


interface ModalStore {
    type: ModalType;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type = null, data = {}) => { set({ isOpen: true, type, data }) },
    onClose: () => { set({ isOpen: false, type: null, data: {} }) },
}))