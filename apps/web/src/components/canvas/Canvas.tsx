'use client';
import { cn } from '@/lib/utils';
import { JSX, useEffect, useRef, useState } from 'react';
import JoinQuizCodeTicker from '../quiz/new/JoinquizCodeTicker';
import { useNewQuizStore } from '@/store/new-quiz/useNewQuizStore';
import { templates } from '@/lib/templates';
import CanvasAccents from '../utility/CanvasAccents';
import CanvasHeading from './CanvasHeading';
import Image from 'next/image';
import CanvasOptions from './CanvasOptions';
import { getImageContainerWidth, useWidth } from '@/hooks/useWidth';

export enum SELECTION_MODE {
    CANVAS = 'CANVAS',
    OPTION = 'OPTION',
    QUESTION = 'QUESTION',
    INTERACTION = 'INTERACTION',
}

export default function Canvas(): JSX.Element {
    const [selectionMode, setSelectionMode] = useState<SELECTION_MODE>(SELECTION_MODE.CANVAS);

    const selectedStyles = 'border-2 border-[#5e59b3]';
    const [copied, setCopied] = useState<boolean>(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const { currentQuestionIndex, quiz } = useNewQuizStore();
    const currentQ = quiz.questions[currentQuestionIndex];
    const currentQTemplate = templates.find((t) => t.id === quiz.theme);
    const canvasWidth = useWidth(canvasRef);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [copied]);

    function canvasTapHandler() {
        setSelectionMode(SELECTION_MODE.CANVAS);
    }

    return (
        <div
            ref={canvasRef}
            style={{ color: currentQTemplate?.text_color, boxSizing: 'border-box' }}
            onClick={canvasTapHandler}
            className={cn(
                'w-full h-full p-0.5 rounded-[12px] relative overflow-hidden',
                selectionMode === SELECTION_MODE.CANVAS && selectedStyles,
            )}
        >
            <CanvasAccents
                design={currentQTemplate?.accent_type}
                accentColor={currentQTemplate?.accent_color}
            />

            <div
                style={{ backgroundColor: currentQTemplate?.background_color }}
                className="bg-[#196cff] h-full rounded-md relative flex flex-col"
            >
                <JoinQuizCodeTicker />
                <CanvasHeading
                    currentQ={currentQ}
                    selectionMode={selectionMode}
                    setSelectionMode={setSelectionMode}
                />
                

                <div className="flex-1 flex items-end justify-center mb-6 z-10">
                    <CanvasOptions
                        selectionMode={selectionMode}
                        setSelectionMode={setSelectionMode}
                    />
                    {currentQ?.imageUrl && (
                        <div
                            className={cn(
                                'h-full flex flex-col justify-end p-2 sm:p-4 relative mb-15',
                                getImageContainerWidth(canvasWidth),
                            )}
                        >
                            <div className="w-full overflow-hidden relative rounded-sm">
                                <Image
                                    src={currentQ.imageUrl}
                                    alt="Question reference image"
                                    className="object-contain w-full h-auto"
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
