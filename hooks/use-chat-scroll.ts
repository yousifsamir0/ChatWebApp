import { MessagesWithCursor } from "@/types/ReturnTypes";
import { useEffect, useState } from "react";




interface useChatScrollProps {
    topDivRef: React.RefObject<HTMLDivElement>;
    bottomDivRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    isLoadingMore: boolean;
    loadMore: () => void
    pages: MessagesWithCursor[]
}
export const useChatScroll = ({
    topDivRef,
    bottomDivRef,
    shouldLoadMore,
    isLoadingMore,
    loadMore,
    pages,
}: useChatScrollProps) => {

    const [initialized, setInitialized] = useState<boolean>(false);
    const [prevPageNumber, setPrevPageNumber] = useState<number>(0);
    const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0)

    useEffect(() => {
        if (pages?.length > 1 && prevPageNumber < pages?.length) {
            const newScrollHeight = topDivRef.current?.scrollHeight as number;
            topDivRef.current?.scrollTo(0, newScrollHeight - prevScrollHeight - 50);
        }

        //update the prevNumber
        setPrevPageNumber(pages?.length);
        setPrevScrollHeight(topDivRef.current?.scrollHeight as number);

    }, [pages])



    useEffect(() => {
        const topDiv = topDivRef?.current;
        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            if (scrollTop === 0 && shouldLoadMore && !isLoadingMore) {
                loadMore()
            }
        }


        topDiv?.addEventListener('scroll', handleScroll);
        return () => {
            topDiv?.removeEventListener('scroll', handleScroll);
        }
    }, [topDivRef, bottomDivRef, shouldLoadMore])


    useEffect(() => {

        const topDiv = topDivRef?.current;
        const botDiv = bottomDivRef?.current;
        const shouldSmoothScroll = (): boolean => {
            if (initialized && topDiv) {
                const distanceFromBottom = topDiv.scrollHeight - (topDiv.scrollTop + topDiv.clientHeight);
                return (distanceFromBottom <= 100);
            }
            return false;
        }
        const shouldAutoScroll = () => {
            if (!initialized && botDiv) {
                setInitialized(true);
                return true
            }
            return false;
        }
        if (shouldAutoScroll()) {
            botDiv?.scrollIntoView()
        }
        else if (shouldSmoothScroll()) {
            botDiv?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [bottomDivRef, topDivRef, initialized, pages?.[0]])


}