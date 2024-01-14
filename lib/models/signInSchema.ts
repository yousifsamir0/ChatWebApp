import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().toLowerCase().email("please enter valid email"),
    password: z.string().min(1, "please enter your password")
})