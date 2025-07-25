"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ToolTipComponent from "../utility/TooltipComponent";
import { AiOutlineQuestionCircle, AiOutlineCopy } from "react-icons/ai";

export default function JoinQuizForm() {
    const [code, setCode] = useState("");

    const handleJoin = () => {
        if (!code.trim()) return;
        console.log("Joining with code:", code);
        // join logic
    };

    const pasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setCode(text);
        } catch (error) {
            console.error("Error while pasting code", error);
        }
    };

    return (
        <div className="mt-8 w-full max-w-md p-6 rounded-[8px] bg-white/70 dark:bg-zinc-900/30 shadow-xl backdrop-blur-md border border-zinc-200 dark:border-zinc-700 transition-all duration-300 space-y-6">
            {/* Code Input */}
            <div className="w-full">
                <div className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Quiz Code
                    <ToolTipComponent content="Enter or paste the quiz code shared by the host">
                        <AiOutlineQuestionCircle size={16} className="text-zinc-500 dark:text-zinc-400" />
                    </ToolTipComponent>
                </div>

                <div className="flex gap-2 mt-3">
                    <Input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="1 2 3 - 4 5 6"
                        className="font-mono text-center placeholder:text-center placeholder:text-zinc-500 flex-1 placeholder:text-[15px]"
                        onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                    />

                    <Button
                        type="button"
                        variant="outline"
                        className="shrink-0 px-3 flex items-center gap-1"
                        onClick={pasteFromClipboard}
                    >
                        <AiOutlineCopy size={16} />
                        Paste
                    </Button>
                </div>
            </div>

            {/* Join Button */}
            <div className="w-full flex justify-center">
                <Button
                    onClick={handleJoin}
                    className="px-5 py-2 font-light text-[15px] rounded-md bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-light-base dark:text-black dark:hover:bg-light-muted hover:-translate-y-0.5 transition-all"
                >
                    Join Quiz
                </Button>
            </div>
        </div>
    );
}
