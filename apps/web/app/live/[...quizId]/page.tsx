'use client';
import { use } from 'react';

export interface NewProps {
    params: Promise<{
        quizId: string;
    }>;
}

export default function New({ params }: NewProps) {
    const { quizId } = use(params);

    return (
        <div>
            {quizId}
        </div>
    )
}
