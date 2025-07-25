import ToolTipComponent from "@/components/utility/TooltipComponent";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function JoinQuizCodeTicker() {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000)
        }
    }, [copied]);

    function copyHandler() {
        setCopied(true);
    }

    return (
        <ToolTipComponent content="The code lets your audience join the presentation and expires in 2 days">
            <div
                className={cn(
                    "bg-neutral-200 px-3 py-1.5 rounded-md font-light z-20",
                    "flex items-center justify-center gap-x-2 absolute top-2 -translate-x-1/2 left-1/2 cursor-pointer",
                    "max-w-[90vw] flex-wrap text-center"
                )}
            >
                <span className="text-sm text-dark-base">Spectators | Use code</span>
                <div
                    onClick={copyHandler}
                    className="bg-dark-base text-light-base py-0.5 px-2 rounded-sm tracking-widest flex items-center justify-center gap-x-1 group"
                >
                    {!copied ? (
                        <CopyIcon
                            className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                            size={12}
                        />
                    ) : (
                        <CheckIcon
                            className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                            size={12}
                        />
                    )}
                    <span>393729</span>
                </div>
            </div>
        </ToolTipComponent>
    );
}
