'use client';

import CountDownClock from '@/components/ui/CountDownClock';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { cn } from '@/lib/utils';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { HostScreenEnum } from '@/types/prisma-types';
import { ChevronRight } from 'lucide-react';

export default function HostQuestionResultsRenderer() {
    const { handleHostQuestionPreviewPageChange } = useWebSocket();
    const { updateGameSession } = useLiveQuizStore();

    function handleOnClick() {
        handleHostQuestionPreviewPageChange(HostScreenEnum.QUESTION_PREVIEW);
        updateGameSession?.({ hostScreen: HostScreenEnum.QUESTION_PREVIEW });
    }

    return (
        <div
            className={cn(
                'w-full h-full overflow-hidden flex flex-col items-center justify-center ',
                'relative',
            )}
        >
            <div className="flex gap-x-4">
                <CountDownClock reverse />
                <div
                    className={cn(
                        'bg-light-base dark:bg-dark-base',
                        'text-dark-base dark:text-light-base',
                        'text-base px-4 py-3 flex justify-center items-center gap-x-2 rounded-xl ',
                        'group cursor-pointer',
                    )}
                    onClick={handleOnClick}
                >
                    <div className="flex flex-col justify-center items-center ">
                        <div>Next</div>
                        <div>Question</div>
                    </div>
                    <ChevronRight className="stroke-1 group-hover:stroke-2 duration-200 ease-in-out" />
                </div>
            </div>
        </div>
    );
}
