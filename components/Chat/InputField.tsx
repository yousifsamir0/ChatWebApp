'use client'
import { z } from 'zod';

import { Paperclip, SendHorizonal, Smile } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useRef } from 'react';
import { globalState } from '../providers/state-provider';
import { format } from "date-fns";

import axios from 'axios';

const formSchema = z.object({
    content: z.string().min(1)
})


function InputField() {

    const { selectedChat } = useContext(globalState)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    })
    const { onChange, onBlur, name, ref } = register('content');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            await axios.post('/api/socket/messages', values, {
                params: {
                    conversationId: selectedChat?.conversations[0].id

                }
            })
            reset();
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        inputRef.current?.focus();
        () => { }
    }, [isSubmitting])
    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-5 gap-3 flex justify-center items-center rounded-3xl  bg-white h-14 w-full'
        >
            <div className='gap-2 flex-1 flex justify-center items-center'>
                <Paperclip className='text-gray-400' />
                <Input
                    className=' placeholder:text-gray-300 bg-white w-full border-0 rounded-full focus-visible:ring-offset-0 focus-visible:ring-0'
                    placeholder='Type a message...'
                    autoComplete='off'
                    autoFocus

                    disabled={isSubmitting}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    ref={(e) => {
                        ref(e);
                        inputRef.current = e;
                    }}
                />
                <Smile className='text-gray-400' />
            </div>
            <div className='mr-3 ml-5 flex justify-center items-center'>
                <button type='submit' className='bg-blue-500 rounded-full size-8 absolute'>
                    <SendHorizonal className='size-4 text-white fill-white relative bottom-0 left-2' />
                </button>
            </div>
        </form >
    )
}

export default InputField