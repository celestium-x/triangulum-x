import { SiSolana } from 'react-icons/si';
import { Barriecito } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MdChevronRight } from 'react-icons/md';

const barriecito = Barriecito({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'],
});

export default function LandingPage() {
    return (
        <div className="h-full flex items-center bg-light-base dark:bg-dark-primary">
            <section className="mx-[12rem] w-full">
                <div className="flex items-center justify-between -mt-16">
                    {/* left section */}
                    <div className="flex-1 max-w-2xl">
                        <div className="mb-8">
                            <div className="flex items-end justify-start mb-4 drop-shadow-2xl">
                                <SiSolana
                                    size={120}
                                    className="text-neutral-900 dark:text-light-base drop-shadow-lg filter "
                                />
                                <span
                                    className={`${barriecito.className} text-8xl text-dark-base dark:text-light-base drop-shadow-md`}
                                >
                                    olana
                                </span>
                            </div>

                            <div className="flex items-center justify-start gap-x-4 space-y-2">
                                <div className="inline-block bg-light-base/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl">
                                    <span className="text-2xl font-semibold text-gray-800">
                                        based
                                    </span>
                                </div>
                                <span
                                    className={`${barriecito.className} text-4xl font-semibold text-dark-base dark:text-light-base tracking-wider`}
                                >
                                    quiz application
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-lg leading-relaxed">
                                Compete in staked quizzes and win real blockchain-powered prizes.
                                Create challenges with prize pools or join exciting competitions
                                with unique codes.
                            </p>

                            <div className="flex gap-4">
                                <Button
                                    className={cn(
                                        'font-light text-sm tracking-wider  flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10]',
                                        'bg-dark-base dark:bg-light-base',
                                    )}
                                >
                                    <span>Sign in</span>
                                    <MdChevronRight className="text-neutral-300 dark:text-dark-base" />
                                </Button>
                                <Button
                                    className={cn(
                                        'font-light text-sm tracking-wider flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10]',
                                        'dark:bg-dark-base bg-light-base hover:bg-light-base text-dark-base dark:text-light-base border border-neutral-300 dark:border-[1px] dark:border-neutral-700',
                                    )}
                                >
                                    <span>Start creating</span>
                                    <MdChevronRight className="text-neutral-300 dark:text-dark-base" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex-1 flex justify-center items-center relative">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-20 h-20 bg-neutral-400/20 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neutral-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                        </div>
                        {/* <LiquidGlass>
                            Hello 
                        </LiquidGlass> */}
                    </div>
                </div>
            </section>
        </div>
    );
}
