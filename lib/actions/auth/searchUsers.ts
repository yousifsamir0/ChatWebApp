'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { FriendWithConversation } from "@/types/extendedModels";
import { Friend_Status, User } from "@prisma/client";

type returnData = {
    queryUsers: Omit<User, 'password'>[] | null;
    error?: string
}

export const searchUser = async (query: string): Promise<returnData> => {

    try {
        query = query.trim();
        const session = await auth();
        const email = session?.user?.email;
        const user = await prisma.user.findUnique({
            where: {
                email: email as string

            }
        })
        if (!user) {
            return {
                queryUsers: null,
                error: "Unauthorized"
            }
        }
        const queryUsers = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            equals: query,
                            mode: 'insensitive'
                        },

                    }

                ],
                NOT: {
                    OR: [
                        {
                            id: user?.id
                        },
                        {
                            friends: {
                                some: {

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

                                    OR: [
                                        { user1Id: user?.id },
                                        { user2Id: user?.id },
                                    ]
                                }
                            }
                        },
                    ],
                }


            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })
        return {
            queryUsers: (queryUsers.length) ? queryUsers : null,
        }




    } catch (error) {
        console.log("[searchUserACTION]: ", error);
        return {
            queryUsers: null,
            error: 'Internal server Error'
        }
    }
}