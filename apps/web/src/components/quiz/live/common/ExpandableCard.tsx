import { cn } from '@/lib/utils';

interface ExpandableCardProps {
    children: React.ReactNode;
    ref: React.RefObject<HTMLDivElement | null>;
    isExpanded: boolean;
    setIsExpanded: (open: boolean) => void;
}

export default function ExpandableCard({ children, ref, isExpanded }: ExpandableCardProps) {
    return (
        <div
            ref={ref}
            className={cn(
                'p-0 rounded-xl z-80',
                'duration-300 ease-in-out transition-all',
                'border border-neutral-200 dark:border-neutral-700 bg-light-base dark:bg-neutral-900',
                'shadow-2xl',
                isExpanded
                    ? 'relative rounded-r-none w-[32vw] min-w-[32vw] max-w-[32vw] h-full border-r-0 border-t-0 border-b-0'
                    : 'absolute bottom-22 right-15 w-[24rem] h-[38rem] rounded-br-none',
            )}
        >
            {children}
        </div>
    );
}
