'use client';
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState, MouseEvent, ChangeEvent } from "react";
import JoinQuizCodeTicker from "../quiz/new/JoinquizCodeTicker";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { IoIosCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { templates } from "@/lib/templates";
import NewQuizInteractiveIcons from "../quiz/new/NewQuizInteractiveIcons";
import CanvasAccents from "../utility/CanvasAccents";
import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore";

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
    const [question, setQuestion] = useState<string>("");
    const { currentQuestionIndex, quiz } = useNewQuizStore();
    const currentQ = quiz.questions[currentQuestionIndex];
    const currentQTemplate = templates.find(t => t.id === quiz.theme);
    const { setState } = useDraftRendererStore();

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

    function questionTapHandler(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        setSelectionMode(SELECTION_MODE.QUESTION);
        setState(DraftRenderer.QUESTION);
    }

    function canvasTapHandler() {
        setSelectionMode(SELECTION_MODE.CANVAS);
    }

    function handleQuestionChange(e: ChangeEvent<HTMLInputElement>) {
        setQuestion(e.target.value);
    }

    function getFontSizeClass(text: string): string {
        const length = text.length;
        if (length === 0) return "text-2xl";
        if (length <= 50) return "text-2xl";
        if (length <= 60) return "text-xl";
        if (length <= 70) return "text-lg";
        if (length <= 95) return "text-base";
        return "text-xs";
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

                {/* Question Section - Fixed at top */}
                <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-[90%] z-10">
                    <div 
                        onClick={questionTapHandler} 
                        className={cn(
                            "p-1 rounded-[10px]",
                            selectionMode === SELECTION_MODE.QUESTION && selectedStyles
                        )}
                        style={{ boxSizing: 'border-box' }}
                    >
                        <input
                            value={currentQ?.question}
                            onChange={handleQuestionChange}
                            className={cn(
                                "w-full py-2 sm:py-3 px-2 rounded-md transition-all duration-200",
                                getFontSizeClass(question)
                            )}
                            placeholder="Ask your question here"
                        />
                    </div>
                </div>

                {/* Option section */}
                <div className="flex-1 flex items-end justify-center p-2 sm:p-4 pt-32 sm:pt-40">
                    <div className={cn("w-full h-full flex flex-col items-end justify-center mb-6",)}>

                        <div className={cn(
                            "w-full h-full flex items-end justify-center ",
                            getResponsiveGap()
                        )}>
                            {currentQ?.options?.map((option, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-end h-full flex-1 min-w-0 px-1">

                                    <div className="flex items-center justify-center gap-x-1 mb-1 sm:mb-2 w-full">
                                        <div className="flex-shrink-0">
                                            {currentQ.correctAnswer === idx ? (
                                                <IoIosCheckmark
                                                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 bg-green-200 rounded-full border-[0.5px] border-green-500"
                                                />
                                            ) : (
                                                <RxCross2 className="bg-red-300 rounded-full p-0.5 sm:p-1 text-red-950 w-3 h-3 sm:w-4 sm:h-4" />
                                            )}
                                        </div>
                                        <span className="text-xs sm:text-sm lg:text-base font-medium">
                                            {Math.round(votes[idx]!)}
                                        </span>
                                    </div>

                                    {/* Responsive Bar */}
                                    <div
                                        className="w-full rounded-tr-md sm:rounded-tr-2xl transition-all duration-1000 ease-in-out border border-white/20 z-50"
                                        style={{
                                            height: getBarHeight(votes[idx]!),
                                            backgroundColor: `${currentQTemplate?.bars[idx]}` || '#4F46E5'
                                        }}
                                    />

                                    {/* Option label - Responsive text */}
                                    <div className="mt-1 sm:mt-2 min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-center w-full">
                                        <div className="text-xs sm:text-sm text-center px-0.5 sm:px-1 leading-tight font-light break-words">
                                            {/* Responsive text truncation */}
                                            <span className="hidden sm:inline">
                                                {option.length > 15 ? `${option.substring(0, 15)}...` : option}
                                            </span>
                                            <span className="sm:hidden">
                                                {option.length > 8 ? `${option.substring(0, 8)}...` : option}
                                            </span>
                                        </div>
                                    </div>
                                </div>
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