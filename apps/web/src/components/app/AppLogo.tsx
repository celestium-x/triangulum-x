import { cn } from '@/lib/utils';
import { Major_Mono_Display } from 'next/font/google';

const major_mono_display = Major_Mono_Display({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'],
});

export default function AppLogo({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'flex items-center justify-start gap-x-4 cursor-pointer group',
                className,
            )}
        >
            <span
                className={`text-[22px] text-neutral-900 dark:text-light-base font-medium tracking-wide ${major_mono_display.className}`}
            >
                Nocturn
            </span>
        </div>
    );
}
