import UtilityCard from "@/components/utility/UtilityCard";
import { JSX } from "react";

export default function QuizLeft(): JSX.Element {
    return (
        <div className="w-full h-full p-4 flex justify-center">
            <div className="w-full flex flex-col mt-20 max-w-[70%]">
                <UtilityCard className="bg-light-base dark:bg-dark-base rounded-xl overflow-hidden py-4 px-6 border border-neutral-300 dark:border-neutral-700">
                    <div className="w-full text-center text-lg font-semibold tracking-wide">Quiz Title</div>
                </UtilityCard>
                <div className="flex-1 bg-red-500 flex items-center justify-center">
                    <div className="">
                        <div className="w-full text-center text-lg font-semibold tracking-wide">Quiz Title</div>
                    </div>
                </div>
            </div>
        </div>
    )
}