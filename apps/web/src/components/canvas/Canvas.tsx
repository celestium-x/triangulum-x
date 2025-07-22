'use client';
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState, MouseEvent, ChangeEvent } from "react";
import JoinQuizCodeTicker from "../quiz/new/JoinquizCodeTicker";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { IoIosCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { templates } from "@/lib/templates";

enum SELECTION_MODE {
    CANVAS = "CANVAS",
    OPTION = "OPTION",
    QUESTION = "QUESTION"
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

    return (
        <div onClick={canvasTapHandler} className={cn("w-full h-full p-0.5 rounded-[12px]",
            selectionMode === SELECTION_MODE.CANVAS && selectedStyles
        )}>
            <div className="bg-[#196cff] h-full rounded-md relative flex flex-col">
                <JoinQuizCodeTicker />

                {/* Question Section - Fixed at top */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] text-light-base z-10">
                    <div onClick={questionTapHandler} className={cn("p-1 rounded-[10px]",
                        selectionMode === SELECTION_MODE.QUESTION && selectedStyles
                    )}>
                        <input
                        
                            style={{ color: currentQTemplate?.text_color }}
                            value={currentQ?.question}
                            onChange={handleQuestionChange}
                            className={cn(
                                "w-full py-3 px-2 rounded-md transition-all duration-200 text-black",
                                getFontSizeClass(question)
                            )}
                            placeholder="Ask your question here"
                        />
                    </div>
                </div>

                {/* Chart/Bars Section - Takes remaining space and positioned at bottom */}
                <div className="flex-1 flex items-end justify-center p-4 pt-40">
                    <div className="w-full max-w-3xl h-64 flex items-end justify-center gap-4">
                        {currentQ?.options?.map((option, idx) => (
                            <div key={idx} className="flex flex-col items-center h-full justify-end flex-1 max-w-[200px] min-w-[60px]">
                                {/* Vote count and status */}
                                <div className="flex items-center justify-start gap-x-1 sm:gap-x-2 mb-2 whitespace-nowrap w-full">
                                    <div className="flex-shrink-0">
                                        {currentQ.correctAnswer === idx ? (
                                            <IoIosCheckmark size={16} className="sm:w-[18px] sm:h-[18px] text-green-600 bg-green-200 rounded-full border-[0.5px] border-green-500" />
                                        ) : (
                                            <RxCross2 className="bg-red-300 rounded-full p-1 text-red-950 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                                        )}
                                    </div>
                                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white">{Math.round(votes[idx]!)}</span>
                                </div>

                                {/* Bar */}
                                <div
                                    className="w-full rounded-t-lg transition-all duration-1000 ease-in-out border border-white/20"
                                    style={{
                                        height: `${Math.max(votes[idx]! * 2, 20)}px`,
                                        backgroundColor: currentQTemplate?.bars[idx] || '#4F46E5'
                                    }}
                                />

                                {/* Option label */}
                                <div className="mt-2 h-8 flex items-center justify-center">
                                    <div className="text-xs sm:text-sm text-center px-1 leading-tight font-light text-white">
                                        {option.length > 12 ? `${option.substring(0, 12)}...` : option}
                                    </div>
                                </div>
                            </div>
                        )) || []}
                    </div>
                </div>
            </div>
        </div>
    )
}