import { Button } from "@/components/ui/button";
import UtilityCard from "@/components/utility/UtilityCard";
import { cn } from "@/lib/utils";
import { RxCross2 } from "react-icons/rx";

interface FullScreenWarningPanelProps {
    accept: () => void;
    deny: () => void;
}

const points = [
    'Do not exit full-screen mode during the session.',
    'Avoid using the TAB or ESC keys.',
    'You are allowed a maximum of three attempts; further violations will restrict access.'
];

export default function FullScreenWarningPanel({ accept, deny }: FullScreenWarningPanelProps) {
    return (
        <UtilityCard
            className={cn(
                "absolute top-1/2 left-1/2 -translate-1/2 z-[999] ",
                "flex flex-col items-start gap-y-5 ",
                "text-neutral-300"
            )}
        >
            <div className="text-red-600 text-xl">
                Warning!
            </div>
            <div className="text-sm">
                <ul className="list-disc list-inside space-y-2">
                    {points.map((point, index) => (
                        <li key={index} className="leading-relaxed text-neutral-400">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full flex justify-end items-center gap-x-3 ">
                <Button
                    variant={'destructive'}
                    className="cursor-pointer"
                    onClick={deny}
                >
                    Deny
                </Button>
                <Button
                    className="cursor-pointer"
                    onClick={accept}
                >
                    Accept
                </Button>
            </div>
        </UtilityCard>
    );
}