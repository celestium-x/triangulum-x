'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { use } from 'react';
export interface NewProps {
    params: Promise<{
        quizId: string;
    }>;
}

export default function New({ params }: NewProps) {
    const { quizId } = use(params);

    useWebSocket();
    return <div className="h-screen w-full">{quizId}</div>;
}
