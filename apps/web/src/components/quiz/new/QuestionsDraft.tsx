import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore";
import { RxCross2 } from "react-icons/rx";
import Options from "./Options";
import ToolTipComponent from "@/components/utility/TooltipComponent";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaMountainSun } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa";
import { TfiLayoutListPost } from "react-icons/tfi";
import { Input } from "@/components/ui/input";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";

export default function QuestionsDraft() {
    const { setState } = useDraftRendererStore();
    const { quiz, currentQuestionIndex } = useNewQuizStore();
    const currentQ = quiz.questions[currentQuestionIndex];
    return (
        <div className="text-neutral-900 dark:text-neutral-100 flex flex-col justify-start items-start gap-y-4">
            <div className="w-full flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-2">
                <div className="text-lg font-medium">Questions</div>
                <RxCross2 onClick={() => setState(DraftRenderer.NONE)} />
            </div>
            <Options />

            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">Base Points</span>
                    <ToolTipComponent content="This is the base points for this question">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Add a relevant image to this question</span>
                </div>
                <Input
                    value={currentQ?.basePoints}
                    className="mt-3"
                    disabled={quiz.pointsMultiplier === 1}
                />
            </div>

            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">Add Image</span>
                    <ToolTipComponent content="This image is particularly relevant to this question">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Add a relevant image to this question</span>
                </div>

                <div className="w-full border border-neutral-300 dark:border-neutral-700 hover:border-[#5e59b3] transition-colors duration-200 bg-white dark:bg-neutral-900 rounded-md flex items-center gap-x-4 cursor-pointer mt-4 px-3 py-1">
                    <FaMountainSun size={32} />
                    <div className="max-w-[70%]">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            Click to upload or drag an image here
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-x-2 mt-5 dark:text-neutral-300 text-neutral-700">
                    <div className="flex items-center justify-evenly w-16 border-2 border-neutral-400 px-1 py-2 rounded-sm">
                        <FaSquare size={20} className="rotate-90" />
                        <TfiLayoutListPost />
                    </div>
                    <div className="flex items-center justify-evenly w-16 border-2 border-neutral-400 px-1 py-2 rounded-sm">
                        <TfiLayoutListPost className="scale-x-[-1]" />
                        <FaSquare size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}