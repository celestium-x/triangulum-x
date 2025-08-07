import WaitingLobbyAvatars from '../common/Avatars';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';

export default function WaitingLobbyParticipantLeft() {
    const { quiz } = useLiveQuizStore();
    const { participants } = useLiveParticipantsStore();
    return (
        <div className="w-full max-h-full flex flex-col relative">
            <WaitingLobbyAvatars participants={participants} />
            <h1 className="absolute left-1/2 -translate-x-1/2 top-20 text-3xl font-extralight w-full text-center">
                {quiz?.title}
            </h1>
        </div>
    );
}
