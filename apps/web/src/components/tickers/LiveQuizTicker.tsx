import { Circle } from 'lucide-react';

export default function LiveQuizTicker() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1 px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <span className="text-[11px] font-medium text-green-700 dark:text-green-300">
                    Live Quiz
                </span>
            </div>
        </div>
    );
}
