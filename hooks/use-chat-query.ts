import { MessagesWithCursor } from "@/types/ReturnTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


interface useChatQueryProps {
    queryKey: string[];
    chatId: string;
    apiUrl: string;

}

export const useChatQuery = ({
    queryKey,
    chatId,
    apiUrl
}: useChatQueryProps) => {

    const fectchMessagePage = async ({ pageParam = null }: { pageParam: string | null }) => {

        const res = await axios.get(apiUrl, {
            params: {
                cursor: pageParam,
                chatId
            }
        })
        return res.data as MessagesWithCursor
    }

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey,
        queryFn: fectchMessagePage,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: null,
        // refetchInterval: 1000,
    });


    return {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        status,
    }
}

