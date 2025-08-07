'use client';
import WaitingLobbyAvatars from '../common/Avatars';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import Image from 'next/image';
import LiveQuizInteractionTicker from '../common/LiveQuizInteractionTicker';
import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import { Button } from '@/components/ui/button';
import { HostScreenEnum } from '@/types/prisma-types';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';

export default function WaitingLobbyHostLeft() {
    const { quiz, updateGameSession } = useLiveQuizStore();
    const { participants } = useLiveParticipantsStore();
    const { handleHostQuestionPreviewPageChange } = useWebSocket();

    function handleOnClick() {
        handleHostQuestionPreviewPageChange(HostScreenEnum.QUESTION_PREVIEW);
        updateGameSession?.({ hostScreen: HostScreenEnum.QUESTION_PREVIEW });
        return;
    }

    return (
        <div className="w-full max-h-full flex flex-col relative">
            <WaitingLobbyAvatars participants={participants} />
            <h1 className="absolute left-1/2 -translate-x-1/2 top-20 text-3xl font-extralight w-full text-center tracking-wider">
                {quiz?.title}
            </h1>
        </div>
    );
}
