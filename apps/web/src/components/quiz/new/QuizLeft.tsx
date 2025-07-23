'use client';
import Canvas from "@/components/canvas/Canvas";
import UtilityCard from "@/components/utility/UtilityCard";

export default function QuizLeft() {
    return (
        <div className="flex-1 h-full flex justify-center p-4 gap-x-4 min-w-0">
            <UtilityCard className="bg-light-base dark:bg-dark-base/30 w-[10rem] flex-shrink-0 shadow-none rounded-sm border-neutral-300 dark:border-neutral-800">hi</UtilityCard>
            <div className="flex flex-col items-start justify-start flex-1 gap-y-2 min-w-0">
                <UtilityCard className="bg-light-base dark:bg-dark-base/30 overflow-hidden py-4 px-6 border border-neutral-300 dark:border-neutral-800 w-full min-h-[4rem] shadow-none rounded-sm">
                    <div className="w-full text-center text-lg font-semibold tracking-wide">
                        Quiz Title
                    </div>
                </UtilityCard>
                <div className="flex-1 flex items-start justify-center w-full min-w-0">
                    <div className="aspect-[16/9] w-full max-w-[900px] min-w-0">
                        <Canvas />
                    </div>
                </div>
            </div>
        </div>
    );
}