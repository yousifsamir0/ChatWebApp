import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useIncomingRequests = () => {
    const store = useQuery({
        queryKey: ['incomingFR'],
        queryFn: async () => {
            const res = await axios.get('/api/friends/incoming');
            return res.data as Omit<User, 'password'>[]
        }
    })

    return store;
}


