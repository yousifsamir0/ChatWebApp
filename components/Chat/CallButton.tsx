import axios from 'axios';
import { Phone } from 'lucide-react';



interface CallButtonProps {
    conversationId: string;
    friendId: string;
}

function CallButton({
    conversationId,
    friendId
}: CallButtonProps) {

    const onClick = async () => {

        try {
            const res = await axios.post("/api/socket/call", { friendId })
            window.open(`/call/${conversationId}`, '_blank', 'width=' + 500 + ', height=' + 500 + ', left=' + 0 + ', top=' + 100);
        }
        catch (error) {

        }

    }


    return (
        <button onClick={onClick}>
            <Phone className="fill-blue-500" size={20} />
        </button>
    )
}

export default CallButton