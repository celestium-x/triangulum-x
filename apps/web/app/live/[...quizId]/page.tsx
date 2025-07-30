'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { templates } from '@/lib/templates';
import { useLiveQuizStore } from '@/store/useLiveQuizStore';
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
    const { quiz, gameSession, updateQuiz, updateGameSession } = useLiveQuizStore();
    const template = templates.find((template) => template.id === quiz?.theme);
    useWebSocket();

    useEffect(() => {
        async function getLiveData() {
            const { data } = await axios.get(`${LIVE_QUIZ_DATA_URL}/${quizId}`, {
                withCredentials: true,
            });

            if (data.success) {
                updateQuiz(data.quiz);
                updateGameSession(data.gameSession);
            }
        }
        getLiveData();
    }, [quizId, updateGameSession, updateQuiz]);

    return (
        <div
            style={{
                backgroundColor: template?.background_color,
            }}
            className="h-screen w-full"
        >
            {gameSession?.participantScreen}
            {quiz?.title}
        </div>
    );
}
