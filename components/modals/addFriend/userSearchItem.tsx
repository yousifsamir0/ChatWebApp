import { useToast } from "@/components/ui/use-toast";
import { addFriend } from "@/lib/actions/auth/add-friend";
import { User } from "@prisma/client"
import axios from "axios";
import { Loader2, UserPlus2 } from "lucide-react";
import Image from "next/image"
import { useState } from "react";


function UserSearchItem({ user, trigger }: { trigger: () => void, user: Omit<User, 'password'> }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const handleAddFriend = async (user: any) => {
        setIsLoading(true)
        try {
            const response = await axios.post('/api/socket/friendrequest', { id: user?.id });
            trigger()
            setTimeout(() => setIsLoading(false), 300)
            toast({
                title: 'Success!',
                description: `Friend request sent to ${user?.name}`
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Failed!',
                description: `Error: ${error}`
            })
            setIsLoading(false);
        }

    }

    return (
        <div key={user.id} className="flex h-14 px-5 py-4 justify-center items-center select-none hover:bg-[#F5F6FA]">
            <div className="size-12 rounded-full overflow-hidden mr-4">
                <Image
                    height={100}
                    width={100}
                    src={'/customers/evil-rabbit.png'}
                    alt="sss"
                />
            </div>
            <div className="flex-1 ">{user.name}</div>
            <button
                disabled={isLoading}
                onClick={() => handleAddFriend(user)}
                className="w-9 h-9 rounded-full relative flex justify-center items-center hover:bg-blue-200  bg-[#F5F6FA]"
            >
                {isLoading ? (
                    <Loader2 className="size-5 text-blue-500 animate-spin" />
                ) : (
                    <UserPlus2 className="size-5 text-blue-500" />
                )}
            </button>

        </div>
    )
}

export default UserSearchItem