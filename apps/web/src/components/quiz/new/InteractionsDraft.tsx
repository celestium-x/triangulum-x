import { RxCross2 } from "react-icons/rx";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { FaHeart, FaLightbulb } from "react-icons/fa6";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import ToolTipComponent from "@/components/utility/TooltipComponent";
import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore";

export default function InteractionsDraft() {
    const { setState } = useDraftRendererStore();
    const [enabled, setEnabled] = useState(false);
    return (
        <div className="text-neutral-900 dark:text-neutral-100">
            <div className="w-full flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-2">
                <div className="text-lg font-medium">Interactions</div>
                <RxCross2 onClick={() => setState(DraftRenderer.NONE)} />
            </div>
            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-4">
                    <FaHeart size={35} className="border-[1px] border-neutral-300 p-2 rounded-md" />
                    <PiCurrencyCircleDollarFill size={35} className="border-[1px] border-neutral-300 p-2 rounded-md" />
                    <FaLightbulb size={35} className="border-[1px] border-neutral-300 p-2 rounded-md" />
                    <BsFillHandThumbsUpFill size={35} className="border-[1px] border-neutral-300 p-2 rounded-md" />
                    <MdEmojiEmotions size={35} className="border-[1px] border-neutral-300 p-2 rounded-md" />
                </div>
            </div>
            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">Live chat</span>
                    <ToolTipComponent content="Enable live chat for your audience to ask questions and interact with you">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Enable live chat</span>
                    <Switch checked={enabled} onCheckedChange={setEnabled} />
                </div>
            </div>
            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">Spectator mode</span>
                    <ToolTipComponent content="Enable spectator mode for your audience to ask questions and interact with you">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center justify-between mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Enable spectator mode</span>
                    <Switch checked={enabled} onCheckedChange={setEnabled} />
                </div>
            </div>
        </div>
    )
}