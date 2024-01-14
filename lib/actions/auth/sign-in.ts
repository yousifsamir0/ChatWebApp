'use server';

import { signIn } from "@/auth";
import { z } from "zod";
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'
import { signInSchema } from '@/lib/models/signInSchema';
import { redirect } from "next/navigation";
import { env } from "process";



export const signin = async (values: z.infer<typeof signInSchema>) => {

    const validation = signInSchema.safeParse({
        email: values.email,
        password: values.password
    })

    if (!validation.success) {
        return {
            error: "Fields invalid"
        }
    }
    const user = await prisma.user.findUnique({
        where: {
            email: values.email
        }
    })
    if (user) {
        // continue hshing

        const isMatch = await bcrypt.compare(values.password, user.password)
        if (isMatch) {

            const redirecLink = await signIn('credentials', { user: JSON.stringify(user), redirect: false });
            const callBackURL = new URL(redirecLink).searchParams.get('callbackUrl');
            redirect(callBackURL ?? process.env.NEXTAUTH_URL as string);

        }
        return {
            error: "Email or Password are invalid !",
        }
    }

    return {
        error: "this email is not exist",
    }
} 