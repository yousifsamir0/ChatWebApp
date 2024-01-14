import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(3, "your name is required"),
    email: z.string().toLowerCase().email("Valid email is required"),
    password: z.string().min(1, "please enter your new password"),
})