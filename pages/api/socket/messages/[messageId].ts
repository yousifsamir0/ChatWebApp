
import { NextApiResponseServerIo } from "@/types/socketServerType";
import { NextApiRequest } from "next";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";




export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {

    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        // console.log(res.headers)
        const { messageId } = req.query;

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
        if (!messageId) {
            return res.status(400).json({ message: "Missing messageId" });
        }



        const message = await prisma.message.delete({
            where: {
                senderId: user?.id,
                id: messageId as string
            },
        })


        const key = `chat:${message.conversationId}:messages`
        res?.socket?.server?.io?.emit(key, message);

        return res.status(200).json(message)


    } catch (error) {
        console.log("[MESSAGES_DELETE]", error);
        return res.status(500).json({ message: "Internal Error" });
    }

}