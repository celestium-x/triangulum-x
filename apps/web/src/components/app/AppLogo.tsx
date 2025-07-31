import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AppLogo({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'flex items-center justify-center gap-x-2 cursor-pointer group',
                className,
            )}
        >
            {/* <TbSquareLetterTFilled size={24} className="group-hover:-translate-x-1 transition-transform ease-in" /> */}
            <Image
                src={'/images/logo.jpg'}
                width={36}
                height={36}
                alt="logo"
                className="rounded-md group-hover:-translate-x-1 transition-transform ease-in"
            />
            <span className="text-xl text-neutral-900 dark:text-light-base font-medium">
                Triangulum
            </span>
        </div>
    );
}
