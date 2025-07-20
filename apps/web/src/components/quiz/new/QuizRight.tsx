import { Button } from "@/components/ui/button";
import UtilityCard from "@/components/utility/UtilityCard";
import { cn } from "@/lib/utils";
import { JSX, useState } from "react";
import { BiSolidMessageEdit } from "react-icons/bi";
import { MdAddReaction } from "react-icons/md";

export enum Renderer {
    THEME = 'THEME',
    QUESTION = 'QUESTION',
    INTERACTION = 'INTERACTION'
}

export default function QuizRight(): JSX.Element {
    const [showPanel, setShowPanel] = useState<Renderer | null>(null);

    return (
        <div className="min-h-full flex justify-end py-4 pr-4">
            <div className={cn(
                "flex gap-x-3 flex-row-reverse rounded-l-xl transition-all duration-300",
                showPanel ? "w-full max-w-4xl" : "w-auto"
            )}>
                <div className="w-[6rem] flex-shrink-0">
                    <div className="bg-light-base dark:bg-dark-base/30 rounded-xl overflow-hidden p-1 flex flex-col gap-y-2 border-[1px] border-neutral-300 dark:border-neutral-700">
                        <Button
                            type="button"
                            onClick={() => setShowPanel(showPanel === Renderer.QUESTION ? null : Renderer.QUESTION)}
                            className={cn("w-full shadow-none h-20 flex items-center justify-center rounded-xl bg-light-base dark:bg-dark-base hover:bg-primary/10",
                                `${showPanel === Renderer.QUESTION && "hover:bg-purple-700/10 bg-primary/30 border border-purple-800"}`
                            )}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <BiSolidMessageEdit className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Question</span>
                            </div>
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setShowPanel(showPanel === Renderer.THEME ? null : Renderer.THEME)}
                            className={cn("w-full shadow-none h-20 flex items-center justify-center rounded-xl bg-light-base dark:bg-dark-base hover:bg-primary/10",
                                `${showPanel === Renderer.THEME && "hover:bg-purple-700/10 bg-primary/30 border border-purple-800"}`
                            )}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <BiSolidMessageEdit className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Theme</span>
                            </div>
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setShowPanel(showPanel === Renderer.INTERACTION ? null : Renderer.INTERACTION)}
                            className={cn("w-full shadow-none h-20 flex items-center justify-center rounded-xl bg-light-base dark:bg-dark-base hover:bg-primary/10",
                                `${showPanel === Renderer.INTERACTION && "hover:bg-purple-700/10 bg-primary/30 border border-purple-800"}`
                            )}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <MdAddReaction className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Interaction</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {showPanel && (
                    <UtilityCard className="bg-light-base dark:bg-dark-base/30 rounded-sm overflow-hidden py-4 px-6 border-[1px] border-neutral-300 dark:border-neutral-800 w-[326px]">
                        <div className="text-neutral-900 dark:text-neutral-100">
                            hey
                        </div>
                    </UtilityCard>
                )}
            </div>
        </div>
    )
}