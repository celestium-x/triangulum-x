import { cn } from '@/lib/utils';
import { Major_Mono_Display } from 'next/font/google';

const grechen_fuemen = Major_Mono_Display({
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
            {/* <FaEarlybirds
                size={28}
                className="group-hover:-translate-x-1 transition-transform ease-in"
            /> */}
            {/* <Image src={'/images/owl.png'} width={26} height={26} alt='logo' className='group-hover:-translate-x-1 transition-transform ease-in' /> */}
            <span
                className={`text-2xl text-neutral-900 dark:text-light-base font-medium tracking-wide ${grechen_fuemen.className}`}
            >
                Nocturn
            </span>
        </div>
    );
}
