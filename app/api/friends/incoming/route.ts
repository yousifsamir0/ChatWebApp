import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";




export const GET = async (req: NextRequest) => {

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
        const users = await prisma.user.findMany({
            where: {
                friends: {
                    some: {
                        user2Id: user?.id,
                        status: 'PENDING'
                    }
                }
            }
            ,
            select: {
                id: true,
                name: true,
                email: true,
            }

        })

        return NextResponse.json(users);




    } catch (error) {
        console.log('[INCOMING-GET]: ', error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}