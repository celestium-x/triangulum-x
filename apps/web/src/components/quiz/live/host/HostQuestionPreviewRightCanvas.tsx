// components/HostQuestionPreviewLeftCanvas.tsx
'use client';

import { cn } from '@/lib/utils';
import { useRef, useState, useEffect } from 'react';
import { templates } from '@/lib/templates';
import { getImageContainerWidth, useWidth } from '@/hooks/useWidth';
import CanvasAccents from '@/components/utility/CanvasAccents';
import Image from 'next/image';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import HostQuestionPreviewOptions from './HostQuestionPreviewOptions';
import { Button } from '@/components/ui/button';
import CanvasOptions from '@/components/canvas/CanvasOptions';
import ToolTipComponent from '@/components/utility/TooltipComponent';

export enum SELECTION_MODE {
    CANVAS = 'CANVAS',
    OPTION = 'OPTION',
    QUESTION = 'QUESTION',
    INTERACTION = 'INTERACTION',
}

export default function HostQuestionPreviewRightCanvas() {
    const [selectionMode, setSelectionMode] = useState<SELECTION_MODE>(SELECTION_MODE.CANVAS);
    const [copied, setCopied] = useState<boolean>(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const canvasWidth = useWidth(canvasRef);

    const { quiz, currentQuestion } = useLiveQuizStore();

    const currentQTemplate = templates.find((t) => t.id === quiz?.theme);

    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 2000);
        }
    }, [copied]);

    
    if (!currentQuestion) {
        return (
            <div className="text-center text-neutral-400 w-full">Select a question to preview</div>
        );
    }

    function handleLaunchQuestion() {
        // launch question logic here
    }

    return (
        <div
            ref={canvasRef}
            onClick={() => setSelectionMode(SELECTION_MODE.CANVAS)}
            className={cn('w-full h-full p-0.5 pl-[11rem] overflow-hidden', '')}
            style={{ color: currentQTemplate?.text_color }}
        >
            <CanvasAccents
                design={currentQTemplate?.accent_type}
                accentColor={currentQTemplate?.accent_color}
            />

            <div
                className="h-full relative flex flex-col"
                style={{ backgroundColor: currentQTemplate?.background_color }}
            >
                <div
                    className={cn(
                        'w-full mb-6 mt-20 flex justify-center items-center text-3xl text-center',
                        selectionMode === SELECTION_MODE.CANVAS,
                    )}
                >
                    {currentQuestion.question}
                </div>

                <div className="w-full mt-20 ml-20 flex justify-start">
                    <div className="w-[30%] h-full left-10 flex flex-col mb-6 z-10 px-10">
                        <HostQuestionPreviewOptions />
                    </div>

                    {currentQuestion?.imageUrl ? (
                        <div
                            className={cn(
                                'h-full flex flex-col justify-end p-2 sm:p-4 relative',
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
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full pr-30">
                            <CanvasOptions
                                selectionMode={selectionMode}
                                setSelectionMode={setSelectionMode}
                            />
                        </div>
                    )}

                    <ToolTipComponent content="Launch this question">
                        <Button
                            className="absolute bottom-8 right-8 z-30 !rounded-md px-8 py-7 dark:bg-neutral-200 dark:text-dark-primary dark:hover:bg-neutral-300 shadow-md group transition-all transform duration-200"
                            onClick={handleLaunchQuestion}
                        >
                            Launch Question{' '}
                            <span className="bg-dark-base flex justify-center items-center px-2 py-1 border text-white rounded-sm shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all transform-3d duration-200">
                                Press Enter
                            </span>
                        </Button>
                    </ToolTipComponent>
                </div>
            </div>
        </div>
    );
}
