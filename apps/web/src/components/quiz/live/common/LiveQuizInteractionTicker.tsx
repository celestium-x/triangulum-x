import { PiCurrencyCircleDollarFill } from 'react-icons/pi';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';
import { FaHeart, FaLightbulb } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

interface LiveQuizInteractionTickerProps {
    className?: string;
}

export default function LiveQuizInteractionTicker({ className }: LiveQuizInteractionTickerProps) {
    return (
        <div className={cn('flex items-center gap-x-2 z-[20]', className)}>
            <FaHeart
                size={35}
                className="border-[1px] dark:border-neutral-500 border-neutral-300 p-2 rounded-full hover:text-red-500 hover:shadow-sm transition-all duration-200 ease-in-out cursor-pointer text-neutral-800"
            />
            <PiCurrencyCircleDollarFill
                size={35}
                className="border-[1px] dark:border-neutral-500 border-neutral-300 p-2 rounded-full hover:text-green-600 hover:shadow-sm transition-all duration-200 ease-in-out cursor-pointer text-neutral-800"
            />
            <FaLightbulb
                size={35}
                className="border-[1px] dark:border-neutral-500 border-neutral-300 p-2 rounded-full hover:text-yellow-400 hover:shadow-sm transition-all duration-200 ease-in-out cursor-pointer text-neutral-800"
            />
            <BsFillHandThumbsUpFill
                size={35}
                className="border-[1px] dark:border-neutral-500 border-neutral-300 p-2 rounded-full hover:text-blue-400 hover:shadow-sm transition-all duration-200 ease-in-out cursor-pointer text-neutral-800"
            />
            <MdEmojiEmotions
                size={35}
                className="border-[1px] dark:border-neutral-500 border-neutral-300 hover:text-amber-400 p-2 rounded-full hover:shadow-sm transition-all duration-200 ease-in-out cursor-pointer text-neutral-800"
            />
        </div>
    );
}
