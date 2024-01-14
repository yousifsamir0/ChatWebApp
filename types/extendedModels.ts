import { Conversation, Message, User } from "@prisma/client";


export type FriendWithConversation = Omit<User, "password"> & {
    conversations: (Conversation & { messages: Message[] })[],
}

export type UserPublic = Omit<User, 'password'>


export type MessageWithSender = Message & {
    sender: UserPublic
}