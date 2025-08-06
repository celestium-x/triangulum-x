import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import WaitingLobbyAvatars from '../quiz/live/common/Avatars';

export default function SpectatorLobbyScreen() {
    const { participants } = useLiveParticipantsStore();

    return (
        <div
            className={`h-full w-full flex justify-center items-center transition-all ease-in-out duration-300`}
        >
            <div className="flex justify-center items-cente">
                <WaitingLobbyAvatars participants={participants} />
            </div>
        </div>
    );
}
