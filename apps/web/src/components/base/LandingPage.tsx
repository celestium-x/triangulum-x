import Image from 'next/image';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';
import AnimatedSvgCircles from '../ui/AnimatedSvgCircles';
import SafariBrowser from '../ui/SafariBrowser';
import { Highlighter } from '../ui/Highlighter';

export default function LandingPage() {
    return (
        <div>
            <div className="flex flex-col mx-auto items-center justify-center gap-y-4 w-full max-w-4xl px-4 py-8 text-center mt-4 relative z-50">
                <div className="absolute bottom-0 -z-10">
                    <AnimatedSvgCircles />
                </div>

                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                    <Image
                        src={'/images/solana-logo.png'}
                        width={25}
                        height={25}
                        alt="solana"
                        className="rounded-full"
                    />
                    <span className="text-sm">powerd by solana</span>
                </HoverBorderGradient>
                <h1
                    className="text-7xl font-semibold text-transparent bg-clip-text tracking-tight
                        bg-gradient-to-b mt-4
                        from-black/60 via-black/80 to-black 
                        dark:from-white/20 dark:via-light-base/50 dark:to-white/80"
                >
                    Stake. Quiz. Compete
                    <br />
                    Win in crypto
                </h1>
                <div className="text-md font-normal dark:text-neutral-400 text-neutral-600 text-wrap max-w-[70%]">
                    A decentralized,{' '}
                    <Highlighter
                        className="dark:text-light-base"
                        color="#4f2b82"
                        action="highlight"
                    >
                        gamified quiz platform{' '}
                    </Highlighter>{' '}
                    where hosts stake crypto, compete in live quiz challenges, and earn{' '}
                    <Highlighter color="#FF9800" action="underline">
                        rewards for their knowledge
                    </Highlighter>{' '}
                    .
                </div>
            </div>
            <SafariBrowser
                url="https://triangulum.com"
                imageSrc="/images/dashboard-ui2.png"
                className="relative mx-auto flex items-center justify-center mt-8 z-50"
            />
        </div>
    );
}
