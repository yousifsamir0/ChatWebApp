'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

function SideSearch() {
    return (
        <div className='relative flex-1'>
            <Input
                className='placeholder:text-gray-300 bg-[#F5F6FA] w-full border-0 rounded-full focus-visible:ring-offset-0 focus-visible:ring-0'
                placeholder='Search'
            />
            <Search className='w-5 h-5 stroke-gray-300 text-muted-foreground absolute top-2.5 right-5' />
        </div>





    )
}

export default SideSearch