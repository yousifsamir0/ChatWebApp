'use server';

import { prisma } from "@/lib/db";

import * as z from 'zod';
import bcrypt from 'bcrypt';

import { signUpSchema } from "@/lib/models/signUpSchema";
import { redirect } from "next/navigation";




export const signup = async (values: z.infer<typeof signUpSchema>) => {

    const validation = signUpSchema.safeParse({
        name: values.name,
        email: values.email,
        password: values.password,
    })
    if (!validation.success) {
        return {
            message: "Failed to sign up missing or invalid fields",
            error: validation.error.flatten().fieldErrors
        }
    }
    const exist = await prisma.user.findUnique({
        where: {
            email: values.email
        }
    });
    if (exist) {
        return {
            message: "this email already exist"
        }
    }

    //hashing the password 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(values.password, salt);

    const user = await prisma.user.create({
        data: {
            name: values.name,
            email: values.email,
            password: hash,
        }
    })

    redirect('/sign-in');
}