
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
        const { friendId, conversationId } = req.query;


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
        if (!friendId) {
            return res.status(400).json({ message: "Missing messageId" });
        }



        const friend = await prisma.friends.deleteMany({
            where: {
                OR: [
                    {
                        user1Id: user?.id,
                        user2Id: friendId as string,
                    },
                    {
                        user1Id: friendId as string,
                        user2Id: user?.id,
                    },
                ]
            },
        })

        const conversation = await prisma.conversation.delete({
            where: {
                id: conversationId as string
            }
        })

        const key = `freinds:${friendId}`
        res?.socket?.server?.io?.emit(key);

        return res.status(200).json({ message: "Done" })


    } catch (error) {
        console.log("[Friends_delete]", error);
        return res.status(500).json({ message: "Internal Error" });
    }

}