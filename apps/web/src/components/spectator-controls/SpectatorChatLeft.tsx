import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import WaitingLobbyAvatars from '../quiz/live/common/Avatars';

interface SpectatorChatLeftProps {
    isChatExpanded: boolean;
}

export default function SpectatorChatLeft({ isChatExpanded }: SpectatorChatLeftProps) {
    const { participants } = useLiveParticipantsStore();

    return (
        <div
            className={`h-screen flex justify-center items-center transition-all ease-in-out duration-300 ${isChatExpanded ? 'w-[100vh]' : 'w-full'}`}
        >
            <div className="flex justify-center items-center">
                <WaitingLobbyAvatars participants={participants} />
            </div>
        </div>
    );
}
