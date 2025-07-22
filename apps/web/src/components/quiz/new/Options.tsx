"use client"

import { cn } from "@/lib/utils";
import { useState } from "react";

interface option {
    color: string,
    placeholder: string
}

const options: option[] = [
    { color: "red", placeholder: "option 1" },
    { color: "#196cff", placeholder: "option 2" },
    { color: "green", placeholder: "option 3" },
    { color: "yellow", placeholder: "option 4" }
];

export default function Options() {

    const [correctOption, setCorrectOption] = useState<option>(options[0]!)

    return <div className="w-full flex flex-col justify-start items-start gap-y-3 ">
        {options.map((option, index) => (
            <div className="flex justify-start items-center gap-x-2 ">
                <div
                    className={`border rounded-sm p-2 `}
                    style={{
                        background: correctOption === option ? "#196cff" : "black"
                    }}
                    onClick={() => setCorrectOption(option)}
                >

                </div>
                <ColoredInput
                    key={index}
                    color={option.color}
                    placeholder={option.placeholder}
                />
            </div>
        ))}
    </div>
}

interface ColoredInputProps {
    className?: string,
    placeholder?: string,
    color: string
}

function ColoredInput({ className, placeholder, color }: ColoredInputProps) {
    return (
        <div
            className={cn(
                `w-full flex justify-start items-center gap-x-2 `,
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
        >
            <div
                className="w-4 h-4 rounded-full"
                style={{ background: color }}
            />
            <input
                placeholder={placeholder}
                className="outline-none h-full w-full bg-transparent text-dark-base dark:text-light-base dark:placeholder:text-light-base placeholder:text-dark-base "
            />
        </div>
    );
}