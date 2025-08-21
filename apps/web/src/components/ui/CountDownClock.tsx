import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type CountDownClockProps =
    | { seconds: number; reverse?: never }
    | { reverse: boolean; seconds?: never };

export default function CountDownClock(props: CountDownClockProps) {
    const [time, setTime] = useState(props.reverse ? 0 : props.seconds!);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => {
                if (props.reverse) {
                    return prev + 1; // count up
                } else {
                    return prev > 0 ? prev - 1 : 0; // count down
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [props.reverse]);

    const minutes = Math.floor(time / 60);
    const secs = time % 60;

    const format = (num: number) => (num < 10 ? `0${num}` : num);

    return (
        <div
            className={cn(
                'flex items-center space-x-2 text-4xl font-bold text-white rounded-xl px-4 py-3',
                'bg-light-base dark:bg-dark-primary dark:text-light-base text-dark-primary'
            )}
        >
            {/* Minutes */}
            <div className="relative w-full overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={minutes}
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {format(minutes)}
                    </motion.span>
                </AnimatePresence>
                <div className="text-sm font-semibold">Minutes</div>
            </div>

            <span className="text-4xl font-mono">:</span>

            {/* Seconds */}
            <div className="relative w-full overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={secs}
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {format(secs)}
                    </motion.span>
                </AnimatePresence>
                <div className="text-sm font-semibold">Seconds</div>
            </div>
        </div>
    );
}
