import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DraftRenderer, useDraftRendererStore } from "@/store/new-quiz/useDraftRendererStore";
import { JSX } from "react";
import { BiSolidMessageEdit } from "react-icons/bi";
import { MdAddReaction } from "react-icons/md";
import Drafts from "./Drafts";

export default function QuizRight(): JSX.Element {
    const { state, setState } = useDraftRendererStore();

    return (
        <div className="min-h-full flex justify-end py-4 pr-4">
            <div className={cn(
                "flex gap-x-3 flex-row-reverse rounded-l-xl transition-all duration-300",
                state ? "w-full max-w-4xl" : "w-auto"
            )}>
                <div className="w-[6rem] flex-shrink-0">
                    <div className="bg-light-base dark:bg-dark-base/30 rounded-xl overflow-hidden p-1 flex flex-col gap-y-2 border-[1px] border-neutral-300 dark:border-neutral-700">
                        <Button
                            type="button"
                            onClick={() => setState(DraftRenderer.QUESTION)}
                            className={cn("w-full shadow-none h-20 flex items-center justify-center rounded-xl bg-light-base dark:bg-dark-base hover:bg-primary/10",
                                `${state === DraftRenderer.QUESTION && "hover:bg-purple-700/10 bg-primary/10 border border-purple-800"}`
                            )}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <BiSolidMessageEdit className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Question</span>
                            </div>
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setState(DraftRenderer.THEME)}
                            className={cn("w-full shadow-none h-20 flex items-center justify-center rounded-xl bg-light-base dark:bg-dark-base hover:bg-primary/10",
                                `${state === DraftRenderer.THEME && "hover:bg-purple-700/10 bg-primary/10 border border-purple-800"}`
                            )}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <BiSolidMessageEdit className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Theme</span>
                            </div>
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setState(DraftRenderer.INTERACTION)}
                            className={cn("w-full shadow-none h-20 flex items-center justify-center rounded-xl bg-light-base dark:bg-dark-base hover:bg-primary/10",
                                `${state === DraftRenderer.INTERACTION && "hover:bg-purple-700/10 bg-primary/10 border border-purple-800"}`
                            )}
                        >
                            <div className="flex flex-col items-center justify-center gap-y-1">
                                <MdAddReaction className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                <span className="text-neutral-900 dark:text-neutral-100 text-xs">Interaction</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {state !== DraftRenderer.NONE && <Drafts />}
            </div>
        </div>
    )
}