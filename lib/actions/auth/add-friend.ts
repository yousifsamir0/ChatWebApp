'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/db";


type returnData = {
    status: "Success" | "Failed";
    error?: string
}

export const addFriend = async (id: string): Promise<returnData> => {

    try {
        id = id.trim();
        const session = await auth();
        const email = session?.user?.email;
        const user = await prisma.user.findUnique({
            where: {
                email: email as string
            }
        })
        if (!user) {
            return {
                status: 'Failed',
                error: "Unauthorized"
            }
        }

        const requestedUser = await prisma.user.findUnique({
            where: { id }
        })
        if (!requestedUser) {
            return {
                status: 'Failed',
                error: "No such a requested user found"
            }
        }

        const request = await prisma.friends.create({
            data: {
                user1Id: user?.id,
                user2Id: requestedUser?.id,
                status: 'PENDING'
            }
        })

        return {
            status: "Success",
        }


    } catch (error) {
        console.log("[Add-Friend-ACTION]: ", error);
        return {
            status: "Failed",
            error: 'Internal server Error'
        }
    }
}