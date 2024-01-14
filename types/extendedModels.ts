import { Conversation, Message, User } from "@prisma/client";


export type FriendWithConversation = Omit<User, "password"> & {
    conversations: (Conversation & { messages: Message[] })[],
}

export type UserPublic = {
    id: string;
    email: string;
    name: string
}


export type MessageWithSender = Message & {
    sender: UserPublic
}