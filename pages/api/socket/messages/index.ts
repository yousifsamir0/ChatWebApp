
import { NextApiResponseServerIo } from "@/types/socketServerType";
import { NextApiRequest } from "next";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";




export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        // console.log(res.headers)
        const { content } = req.body;
        const { conversationId } = req.query;
        const session = await auth(req, res);

        const isAuthed = session?.user?.email
        if (!isAuthed) {
            return res.status(401).json({ message: "unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: isAuthed
            }
        })

        if (!user) {
            return res.status(401).json({ message: "unauthorized" });
        }
        if (!content) {
            return res.status(400).json({ message: "Missing content" });
        }
        if (!conversationId) {
            return res.status(400).json({ message: "Missing ConversationId" });
        }

        const conversation = prisma.conversation.findUnique({
            where: {
                id: conversationId as string
            }
        })

        if (!conversation) {
            return res.status(404).json({ message: "no such conversation match this id" })
        }

        const message = await prisma.message.create({
            data: {
                content: content as string,
                senderId: user?.id,
                conversationId: conversationId as string
            },
            include: {
                sender: true //todo  handle returned password
            }
        })


        const key = `chat:${conversationId}:messages`
        res?.socket?.server?.io?.emit(key, message);

        return res.status(200).json(message)


    } catch (error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    }

}