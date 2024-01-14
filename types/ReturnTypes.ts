import { MessageWithSender } from "./extendedModels"

export type MessagesWithCursor = {
    messages: MessageWithSender[],
    nextCursor: string | null
}