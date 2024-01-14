'use client'

import CallPage from "@/components/callPage/call-page";
import { LiveKitRoom } from "@livekit/components-react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {
    const [token, setToken] = useState("");
    const params = useParams<{ conversationId: string }>()
    const { data: session, status } = useSession();

    const room = params?.conversationId;
    const name = session?.user?.name;


    useEffect(() => {

        (async () => {
            try {
                const resp = await fetch(
                    `/api/livekit?room=${room}&username=${name}`
                );
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);


    if (token === "") {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className='animate-spin' />
            </div>
        );
    }
    return (
        <div className="h-full w-full">

            <LiveKitRoom
                video={true}
                audio={true}
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                // Use the default LiveKit theme for nice styles.
                data-lk-theme="default"
                style={{ height: '100dvh' }}
            >

                <CallPage />
            </LiveKitRoom>

        </div>
    );
}