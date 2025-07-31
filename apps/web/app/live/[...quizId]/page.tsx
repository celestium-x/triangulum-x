'use client';
import LiveUserRendererScreens from '@/components/quiz/live/LiveUserRendererScreens';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import {
    useLiveHostStore,
    useLiveParticipantStore,
    useLiveSpectatorStore,
    useUserRoleStore,
} from '@/store/live-quiz/useLiveQuizUserStore';
import axios from 'axios';
import { use, useEffect } from 'react';
import { LIVE_QUIZ_DATA_URL } from 'routes/api_routes';

export interface NewProps {
    params: Promise<{
        quizId: string;
    }>;
}

export default function New({ params }: NewProps) {
    const { quizId } = use(params);
    const { quiz, updateQuiz, updateGameSession } = useLiveQuizStore();
    const { setHostData } = useLiveHostStore();
    const { setParticipantData } = useLiveParticipantStore();
    const { setSpectatorData } = useLiveSpectatorStore();
    const { setCurrentUserType } = useUserRoleStore();

    useWebSocket();

    useEffect(() => {
        async function getLiveData() {
            try {
                const { data } = await axios.get(`${LIVE_QUIZ_DATA_URL}/${quizId}`, {
                    withCredentials: true,
                });
                if (data.success) {
                    updateQuiz(data.quiz);
                    updateGameSession(data.gameSession);
                    setCurrentUserType(data.role);

                    switch (data.role) {
                        case 'HOST':
                            setHostData(data.userData);
                            break;
                        case 'PARTICIPANT':
                            setParticipantData(data.userData);
                            break;
                        case 'SPECTATOR':
                            setSpectatorData(data.userData);
                            break;
                        default:
                            break;
                    }
                }
            } catch (error) {
                console.error('Error fetching live data:', error);
            }
        }
        getLiveData();
    }, [
        quizId,
        updateGameSession,
        updateQuiz,
        setCurrentUserType,
        setHostData,
        setParticipantData,
        setSpectatorData,
    ]);

    if (!quiz) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen">
            <LiveUserRendererScreens />
        </div>
    );
}
