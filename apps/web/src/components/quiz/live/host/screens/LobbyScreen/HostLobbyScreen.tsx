'use client';

import JoinQuizCodeTicker from '@/components/quiz/new/JoinquizCodeTicker';
import HostLobbyFooter from './HostLobbyFooter';
import HostLobbyRenderer from './HostLobbyRenderer';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { USER_TYPE } from '@/types/prisma-types';

export default function HostLobbyScreen() {

    const { quiz } = useLiveQuizStore();

    return (
        <div className="w-full h-full flex">
            <HostLobbyRenderer />
            <HostLobbyFooter />
            {/* <WaitingLobbyHostRight /> */}
            <JoinQuizCodeTicker
                position='b'
                copyCode={quiz?.participantCode}
                user={USER_TYPE.PARTICIPANT}
            />
        </div>
    );
}
