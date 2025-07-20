import { Button } from "@/components/ui/button";
import UtilityCard from "@/components/utility/UtilityCard";
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
        <div className="min-h-full flex justify-end p-4">
            <div className="flex gap-x-3 w-full max-w-4xl flex-row-reverse rounded-l-xl">
                <div className="w-[6rem] flex-shrink-0">
                    <div className="bg-light-base dark:bg-dark-base rounded-xl overflow-hidden p-1 flex flex-col gap-y-2 border-[1px] border-neutral-300 dark:border-neutral-700">
                        <Button
                            type="button"
                            onClick={() => setShowPanel(Renderer.QUESTION)}
                            className={`w-full shadow-none h-20 flex items-center justify-center rounded-xl ${showPanel === Renderer.QUESTION
                                    ? "hover:bg-purple-700/10 bg-primary/30 border border-purple-800"
                                    : "bg-primary/30 hover:bg-primary/20"
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <BiSolidMessageEdit className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Question</span>
                            </div>
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setShowPanel(Renderer.THEME)}
                            className={`w-full shadow-none h-20 flex items-center justify-center rounded-xl ${showPanel === Renderer.THEME
                                    ? "hover:bg-purple-700/10 bg-primary/30 border border-purple-800"
                                    : "bg-primary/30 hover:bg-primary/20"
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <BiSolidMessageEdit className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Theme</span>
                            </div>
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setShowPanel(Renderer.INTERACTION)}
                            className={`w-full shadow-none h-20 flex items-center justify-center rounded-xl ${showPanel === Renderer.INTERACTION
                                    ? "hover:bg-purple-700/10 bg-primary/30 border border-purple-800"
                                    : "bg-primary/30 hover:bg-primary/20"
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <MdAddReaction className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Interaction</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {showPanel && (
                    <UtilityCard className="mt-20 bg-light-base dark:bg-dark-base rounded-xl overflow-hidden min-w-[25rem] py-4 px-6 border-[1px] border-neutral-300 dark:border-neutral-700">
                        <div className="text-neutral-900 dark:text-neutral-100">
                            hey
                        </div>
                    </UtilityCard>
                )}
            </div>
        </div>
    )
}