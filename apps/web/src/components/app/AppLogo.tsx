import { cn } from '@/lib/utils';
import { TbSquareLetterTFilled } from 'react-icons/tb';

export default function AppLogo({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'flex items-center justify-center gap-x-2 cursor-pointer group',
                className,
            )}
        >
            <TbSquareLetterTFilled
                size={28}
                className="group-hover:-translate-x-1 transition-transform ease-in"
            />
            <span className="text-xl text-neutral-900 dark:text-light-base font-medium">
                Triangulum
            </span>
        </div>
    );
}
