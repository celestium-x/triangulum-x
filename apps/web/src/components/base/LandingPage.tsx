import { Barriecito } from 'next/font/google';
import Image from 'next/image';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';
import { Button } from '../ui/button';

const barriecito = Barriecito({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'],
});

export default function LandingPage() {
    return (
        <div className="">
            <div className='flex flex-col mx-auto items-center justify-center gap-y-4 w-full max-w-4xl px-4 py-8 text-center mt-4'>
                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                    <Image
                        src={"/images/solana-logo.png"}
                        width={25}
                        height={25}
                        alt='solana'
                        className='rounded-full'
                    />
                    <span className='text-sm'>powerd by solana</span>
                </HoverBorderGradient>
                <h1 className="text-7xl font-semibold text-transparent bg-clip-text tracking-tight
                        bg-gradient-to-b mt-4
                        from-black/60 via-black/80 to-black 
                        dark:from-white/20 dark:via-light-base/50 dark:to-white/80">
                    Stake. Quiz. Compete
                    <br />
                    Win in crypto
                </h1>

                <div className='text-md font-normal dark:text-neutral-400 text-neutral-600 text-wrap max-w-[70%]'>
                    A decentralized, gamified quiz platform where hosts stake crypto, compete in live quiz challenges, and earn rewards for their knowledge.
                </div>


            </div>
            <div className='mx-auto flex items-center justify-center mt-8 border-dashed border dark:border-neutral-600 border-neutral-600 w-fit rounded-[24px] p-2'>
                <Image
                    src={"/images/dashboard-ui2.png"}
                    width={1200}
                    height={1200}
                    alt='dashboard-ui'
                    unoptimized={true}
                    className='rounded-[16px] border-[1px] dark:border-neutral-600 border-neutral-600'
                />
            </div>
        </div>
    );
}
