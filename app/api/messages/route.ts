import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { MessageWithSender } from "@/types/extendedModels";


const MSG_BATCH = 15;

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


        const searchParams = req.nextUrl.searchParams
        const chatId = searchParams.get("chatId")
        const cursor = searchParams.get("cursor")
        if (!chatId) {
            return new NextResponse("Bad Request", { status: 400 });
        }



        let messages: MessageWithSender[] = []
        if (cursor) {
            messages = await prisma.message.findMany({
                take: MSG_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId: chatId,
                },
                orderBy: {
                    timestamp: "desc",
                },
                include: {
                    sender: true
                }
            })

        }
        else {
            messages = await prisma.message.findMany({
                take: MSG_BATCH,
                where: {
                    conversationId: chatId,
                },
                orderBy: {
                    timestamp: "desc",
                },
                include: {
                    sender: true
                }
            })
        }

        let nextCursor = null;
        if (messages.length === MSG_BATCH) {
            nextCursor = messages[MSG_BATCH - 1].id
        }

        return NextResponse.json({
            messages,
            nextCursor
        })




    } catch (error) {
        console.log('[Messages-GET]: ', error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}