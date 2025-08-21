'use client';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';
import { getImageContainerWidth, useWidth } from '@/hooks/useWidth';
import Image from 'next/image';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import HostQuestionPreviewOptions from './HostQuestionPreviewOptions';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';

export default function HostQuestionPreviewRenderer() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const canvasWidth = useWidth(canvasRef);
    const { currentQuestion } = useLiveQuizStore();
    const { handleSendHostLaunchQuestion } = useWebSocket();

    function handleLaunchQuestion(e: KeyboardEvent) {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && currentQuestion) {
            e.preventDefault();
            handleSendHostLaunchQuestion({
                questionId: currentQuestion?.id,
                questionIndex: currentQuestion?.orderIndex,
            });
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleLaunchQuestion);
        return () => {
            document.removeEventListener('keydown', handleLaunchQuestion);
        };
    });

    if (!currentQuestion) {
        return (
            <div className="text-center text-neutral-400 w-full">Select a question to preview</div>
        );
    }

    return (
        <div
            ref={canvasRef}
            className={cn(
                'w-full h-full overflow-hidden flex flex-col items-center justify-center ',
                'relative',
            )}
        >
            <div className="min-h-[32rem] w-[90%] flex flex-col justify-between">
                <div
                    className={cn('w-full text-3xl text-center')}
                    dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                />
                <div className="flex flex-row items-center justify-center">
                    {currentQuestion.imageUrl && (
                        <div
                            className={cn(
                                'h-full flex flex-col justify-end p-2 sm:p-4 relative mb-15',
                                getImageContainerWidth(canvasWidth),
                            )}
                        >
                            <div className="w-full overflow-hidden relative rounded-sm">
                                <Image
                                    src={currentQuestion.imageUrl}
                                    alt="Question reference image"
                                    className="object-contain w-full h-auto"
                                    width={500}
                                    height={500}
                                    unoptimized
                                />
                            </div>
                        </div>
                    )}
                    <HostQuestionPreviewOptions />
                </div>
            </div>
        </div>
    );
}
