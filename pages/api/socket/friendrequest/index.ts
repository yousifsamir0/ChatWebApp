
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
        const { id } = req.body;
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
        if (!id) {
            return res.status(400).json({ message: "Bad request" });
        }

        const requestedUser = await prisma.user.findUnique({
            where: { id }
        })
        if (!requestedUser) {
            return res.status(404).json({ message: "User not exist" });
        }

        await prisma.friends.create({
            data: {
                user1Id: user?.id,
                user2Id: requestedUser?.id,
                status: 'PENDING'
            }
        });


        const key = `request:${requestedUser?.id}`
        res?.socket?.server?.io?.emit(key);

        return res.status(200).json({ message: 'success' })


    } catch (error) {
        console.log("[FRIEND-REQUEST_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    }

}