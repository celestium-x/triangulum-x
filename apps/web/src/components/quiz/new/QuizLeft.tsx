'use client';
import Canvas from "@/components/canvas/Canvas";
import UtilityCard from "@/components/utility/UtilityCard";
import QuestionPallete from "./QuestionPallete";
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

export default function QuizLeft() {
    return (
        <div className="flex-1 h-full flex justify-center p-4 gap-x-4 min-w-0">
            <QuestionPallete />
            <div className="flex flex-col items-start justify-start flex-1 gap-y-2 min-w-0">
                <UtilityCard className="bg-light-base dark:bg-dark-base/30 overflow-hidden py-4 px-6 border border-neutral-300 dark:border-neutral-800 w-full min-h-[4rem] shadow-none rounded-sm">
                    <div className="relative flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                Question 1 of 10
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 disabled:opacity-50">
                                    <ChevronLeft size={16} />
                                </button>
                                <button className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 disabled:opacity-50">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold tracking-wide">
                            Quiz Title
                        </div>

                        <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                            <Users size={18} />
                        </div>
                    </div>
                </UtilityCard>
                <div className="flex-1 flex items-start justify-center w-full min-w-0">
                    <div className="aspect-[16/9] w-full min-w-0">
                        <Canvas />
                    </div>
                </div>
            </div>
        </div>
    );
}