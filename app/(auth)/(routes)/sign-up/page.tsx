'use client';


import * as z from "zod"
import { signup } from "@/lib/actions/auth/sign-up";
import { signUpSchema } from "@/lib/models/signUpSchema";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Link from "next/link";




function SignUpPage() {

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })
    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {

        const res = await signup(values);

        console.log(res)

    }


    return (


        <div className='flex flex-col bg-white w-[400px] p-6 shadow-md  rounded-lg gap-5 '>
            <div className=' flex flex-col gap-3'>
                <h1 className='uppercase font-semibold text-2xl text-center'>signup</h1>
                <hr />
            </div>

            <Form {...form} >
                <form
                    className="space-y-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className=" flex flex-col space-y-4 px-6 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className=' border-0 bg-[#F5F6FA]'
                                            type='text'
                                            placeholder='Enter your name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}

                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className=' border-0 bg-[#F5F6FA]'
                                            type='email'
                                            placeholder='Enter your email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            className=' border-0 bg-[#F5F6FA]'
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full space-y-5">

                        <Button className='uppercase w-full mt-4 block' type='submit' >signup</Button>
                        <div className="text-center">
                            <Link href={'/sign-in'}>
                                Already have an account? Signin.
                            </Link>
                        </div>
                    </div>

                </form>
            </Form>
        </div >

    )
}

export default SignUpPage