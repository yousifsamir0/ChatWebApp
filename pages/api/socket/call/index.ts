
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
        const { friendId } = req.query;


        const session = await auth(req, res);
        const isAuthed = session?.user?.email

        if (!isAuthed) {
            return res.status(401).json({ message: "unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: isAuthed
            }
            ,
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            return res.status(401).json({ message: "unauthorized" });
        }


        const key = `call:${friendId}`;
        res?.socket?.server?.io?.emit(key, user);

        return res.status(200).json({ message: "Done" })


    } catch (error) {
        console.log("[CALL_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    }

}