import ToolTipComponent from "@/components/utility/TooltipComponent";
import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { getSingletonPointsCalculator } from "@/singletons/singletonPointsCalculator";

export default function AdvancedDraft() {
    const [enabled, setEnabled] = useState<boolean>(false);
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

            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">Points Multiplier</span>
                    <ToolTipComponent content="Do you want to use point multiplier?">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Enable points multiplier</span>
                    <Switch checked={enabled} onCheckedChange={setEnabled} />
                </div>

                <div className="mt-4">
                    {enabled && (
                        <Input
                            min={1}
                            step="0.1"
                            type="number"
                            value={pointMultiplier}
                            onChange={handleOnChange}
                            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
"
                        />
                    )}
                </div>
            </div>


        </div>
    )
}