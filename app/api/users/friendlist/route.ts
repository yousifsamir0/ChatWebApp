import { NextResponse } from "next/server"
import { auth } from "@/auth"

import { prisma } from "@/lib/db"
import { Friend_Status } from "@prisma/client";

import { FriendWithConversation } from "@/types/extendedModels";


export const GET = async (req: Request) => {
    // console.log('got there')
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email,
            },
            include: {
                friends: true,
                friendsOf: true
            }
        })


        const friends = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        friends: {
                            some: {
                                status: Friend_Status.ESTABLISHED,
                                OR: [
                                    { user1Id: user?.id },
                                    { user2Id: user?.id },
                                ]
                            }
                        }
                    },
                    {
                        friendsOf: {
                            some: {
                                status: Friend_Status.ESTABLISHED,
                                OR: [
                                    { user1Id: user?.id },
                                    { user2Id: user?.id },
                                ]
                            }
                        }
                    },
                ],

                NOT: {
                    id: user?.id
                }
            }
            ,
            select: {
                id: true,
                name: true,
                email: true,
                conversations: {
                    where: {
                        users: {
                            some: {
                                id: user?.id
                            }
                        }
                    },
                    include: {
                        messages: {
                            take: 1,
                            orderBy: {
                                timestamp: "desc"
                            }
                        }
                    }
                }
            },

        }) as FriendWithConversation[]


        return NextResponse.json(friends)



    } catch (error) {
        console.log("[GET_FRIEND_LIST]: ", error)
        return new NextResponse("Internal error", { status: 500 })
    }

}