import { cn } from '@/lib/utils';

interface HeadAndSubHeadProps extends React.HTMLAttributes<HTMLDivElement> {
    heading: string;
    subHeading: string;
    className?: string;
    headClassname?: string;
    subHeadClassname?: string;
}

export default function HeadAndSubHead({
    heading,
    subHeading,
    className,
    headClassname,
    subHeadClassname,
    ...props
}: HeadAndSubHeadProps) {
    return (
        <div
            {...props}
            className={`flex flex-col items-start justify-center dark:text-neutral-300 text-neutral-800 ${className ?? ''}`}
        >
            <span className={cn('text-lg font-bold', headClassname)}>{heading}</span>
            <span className={cn('font-normal text-sm', subHeadClassname)}>{subHeading}</span>
        </div>
    );
}
