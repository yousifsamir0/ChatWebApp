import { auth } from "@/auth";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db";


export const GET = async (req: Request, { params }: { params: { userid: string } }) => {
    try {
        const session = await auth();
        const isAuthed = session?.user?.email

        if (!isAuthed) {
            return new NextResponse("unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: isAuthed
            }
        })
        if (!user) {
            return new NextResponse("unauthorized", { status: 401 });
        }

        const userReq = await prisma.user.findUnique({
            where: {
                id: params.userid
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        if (!userReq) {
            return new NextResponse("Bad request", { status: 400 });
        }
        return NextResponse.json(userReq);

    } catch (error) {
        console.log('[USER_GET]: ', error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}