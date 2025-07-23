import ToolTipComponent from "@/components/utility/TooltipComponent";
import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { useAutoSaveStore } from "@/store/home/useAutoSaveStore";
import { RiLineChartLine } from "react-icons/ri";
import { HiChartBar } from "react-icons/hi";
import { getSingletonPointsCalculator } from "@/lib/singletonPointsCalculator";
import { Button } from "@/components/ui/button";


export default function AdvancedDraft() {
    const [enablePointMultiplier, setEnablePointMultiplier] = useState<boolean>(false);
    const { enabledAutoSave, setEnableAutoSave } = useAutoSaveStore();
    const { setState } = useDraftRendererStore();
    const [pointMultiplier, setPointMultiplier] = useState<string>("1.2");
    const { quiz, updateQuestionPoints } = useNewQuizStore();
    const singletonPointsCalculator = getSingletonPointsCalculator(quiz.questions.length, Number(quiz.basePointsPerQuestion));

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        if (value === "") {
            setPointMultiplier("");
            return;
        }

        const num = Number(value);
        if (!isNaN(num) && num >= 1) {
            setPointMultiplier(value);
        }

        const points = singletonPointsCalculator.calculate_linear_points(Number(value));
        updateQuestionPoints(points);
    }

    return (
        <div className="text-neutral-900 dark:text-neutral-100 flex flex-col justify-start items-start gap-y-4">
            <div className="w-full flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-2">
                <div className="text-lg font-medium">Advance Options</div>
                <RxCross2 onClick={() => setState(DraftRenderer.NONE)} />
            </div>

            {/* Auto-Save Component */}
            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">Auto Save</span>
                    <ToolTipComponent content="Turn this on to save your quiz questions automatically.">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Enable auto save</span>
                    <Switch className="cursor-pointer" checked={enabledAutoSave} onCheckedChange={setEnableAutoSave} />
                </div>
            </div>

            {/* Point Multiplier Component */}
            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">Points Multiplier</span>
                    <ToolTipComponent content="Do you want to use point multiplier?">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Enable points multiplier</span>
                    <Switch className="cursor-pointer" checked={enablePointMultiplier} onCheckedChange={setEnablePointMultiplier} />
                </div>

                <div className="mt-4">
                    {enablePointMultiplier && (
                        <div className="pt-3">
                            <div className="flex flex-col space-y-2">
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">Customize</span>

                                <Input
                                    min={1}
                                    step="0.1"
                                    type="number"
                                    value={pointMultiplier}
                                    onChange={handleOnChange}
                                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
"
                                />
                            </div>

                            <div className="flex flex-col space-y-2 mt-5">
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                    Multiplier Types
                                </span>

                                <div className="flex flex-row items-center gap-x-3 dark:text-neutral-300 text-neutral-700">
                                    <div className="flex flex-col items-center space-y-2">
                                        <Button className="flex items-center justify-center w-16 h-12 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ease-in-out bg-light-base dark:bg-dark-base/30 dark:text-neutral-300 text-neutral-700">
                                            <RiLineChartLine size={20} />
                                        </Button>
                                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Linear</span>
                                    </div>

                                    <div className="flex flex-col items-center space-y-2">
                                        <Button className="flex items-center justify-center w-16 h-12 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ease-in-out bg-light-base dark:bg-dark-base/30 dark:text-neutral-300 text-neutral-700">
                                            <HiChartBar size={20} />
                                        </Button>
                                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Stepped</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}