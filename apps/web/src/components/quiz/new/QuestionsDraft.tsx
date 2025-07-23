import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore";
import { RxCross2 } from "react-icons/rx";
import Options from "./Options";


export default function QuestionsDraft() {
    const { setState } = useDraftRendererStore();
    return (
        <div className="text-neutral-900 dark:text-neutral-100 flex flex-col justify-start items-start gap-y-4">
            <div className="w-full flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-2">
                <div className="text-lg font-medium">Questions</div>
                <RxCross2 onClick={() => setState(DraftRenderer.NONE)} />
            </div>
            <Options />
        </div>
    )
}