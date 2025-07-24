'use client';
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";
import JoinQuizCodeTicker from "../quiz/new/JoinquizCodeTicker";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { templates } from "@/lib/templates";
import NewQuizInteractiveIcons from "../quiz/new/NewQuizInteractiveIcons";
import CanvasAccents from "../utility/CanvasAccents";
import CanvasOptions from "./CanvasOptions";
import CanvasHeading from "./CanvasHeading";

export enum SELECTION_MODE {
    CANVAS = "CANVAS",
    OPTION = "OPTION",
    QUESTION = "QUESTION",
    INTERACTION = 'INTERACTION'
}

export default function Canvas(): JSX.Element {
    const [selectionMode, setSelectionMode] = useState<SELECTION_MODE>(SELECTION_MODE.CANVAS);
    const [votes, setVotes] = useState([0, 0, 0, 0]);
    const selectedStyles = "border-2 border-[#5e59b3]";
    const [copied, setCopied] = useState<boolean>(false);
    const { currentQuestionIndex, quiz } = useNewQuizStore();
    const currentQ = quiz.questions[currentQuestionIndex];
    const currentQTemplate = templates.find(t => t.id === quiz.theme);

    useEffect(() => {
        const interval = setInterval(() => {
            setVotes(prev => {
                return prev.map(() => {
                    return Math.floor(Math.random() * 80) + 10;
                });
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [currentQ]);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000)
        }
    }, [copied])

    function canvasTapHandler() {
        setSelectionMode(SELECTION_MODE.CANVAS);
    }

    function getBarHeight(voteValue: number): string {
        const percentage = Math.max(voteValue, 5);
        return `max(${percentage * 0.8}%, 1.5rem)`;
    }

    function getResponsiveGap(): string {
        const optionCount = currentQ?.options?.length || 4;
        if (optionCount <= 2) return "gap-8 sm:gap-12 md:gap-16";
        if (optionCount === 3) return "gap-4 sm:gap-8 md:gap-12";
        return "gap-2 sm:gap-4 md:gap-6 lg:gap-8";
    }

    return (
        <div
            style={{
                color: currentQTemplate?.text_color,
                boxSizing: 'border-box'
            }}
            onClick={canvasTapHandler}
            className={cn(
                "w-full h-full p-0.5 rounded-[12px] relative overflow-hidden",
                selectionMode === SELECTION_MODE.CANVAS && selectedStyles
            )}
        >
            <CanvasAccents design={currentQTemplate?.accent_type} accentColor={currentQTemplate?.accent_color} />

            <div style={{ backgroundColor: currentQTemplate?.background_color }} className="bg-[#196cff] h-full rounded-md relative flex flex-col">
                <JoinQuizCodeTicker />
                <CanvasHeading currentQ={currentQ} selectionMode={selectionMode} setSelectionMode={setSelectionMode} />

                {/* canvas options */}
                <div className="flex-1 flex items-end justify-center p-2 sm:p-4 pt-40 sm:pt-48">
                    <div className={cn("w-full h-full flex flex-col items-end justify-center mb-6",)}>
                        <div className={cn(
                            "w-full h-full flex items-end justify-center ",
                            getResponsiveGap()
                        )}>
                            {currentQ?.options?.map((option, idx) => (
                                <CanvasOptions key={idx} idx={idx} option={option} votes={votes} currentQ={currentQ} currentQTemplate={currentQTemplate} getBarHeight={getBarHeight} />
                            )) || []}
                        </div>
                        <div className="absolute bottom-1 right-1">
                            <NewQuizInteractiveIcons selectionMode={selectionMode} setSelectionMode={setSelectionMode} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}