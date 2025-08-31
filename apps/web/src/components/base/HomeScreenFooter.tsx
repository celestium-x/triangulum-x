'use client';
import AppLogo from '../app/AppLogo';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomeScreenFooter() {
    return (
        <footer className="relative w-full min-h-5xl mt-10 pb-60 text-white overflow-hidden select-none">
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at center bottom, 
                            rgba(255, 165, 80, 0.3) 0%, 
                            rgba(255, 140, 60, 0.25) 15%, 
                            rgba(220, 100, 40, 0.2) 25%, 
                            rgba(180, 80, 35, 0.15) 35%, 
                            rgba(120, 60, 30, 0.12) 45%, 
                            rgba(80, 50, 40, 0.1) 55%, 
                            #0A0A0A 65%, 
                            #0A0A0A 75%, 
                            #0A0A0A 85%, 
                            #0A0A0A 95%, 
                            #0A0A0A 100%
                        )
                    `,
                }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-20">
                <div className="grid grid-cols-4 gap-40">
                    <div className="flex-col">
                        <span>
                            <AppLogo />
                        </span>
                        <div className="w-full flex gap-x-2 px-2.5 pt-4">
                            <span className="h-10 w-10 rounded-full border p-2 flex justify-center items-center bg-neutral-900/70">
                                <FaXTwitter className="h-4.5 w-4.5" />
                            </span>

                            <span className="h-10 w-10 rounded-full border p-2 flex justify-center items-center bg-neutral-900/70">
                                <FaGithub className="h-4.5 w-4.5" />
                            </span>
                        </div>

                        <div
                            className={cn(
                                'mx-2.5 px-6 py-1.5 gap-x-2 mt-4 bg-neutral-900/70 rounded-md border',
                                'flex justify-around items-center group cursor-pointer font-extralight tracking-wider',
                            )}
                        >
                            Developers
                            <ChevronRight className="size-6 transform transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="uppercase text-[13px] tracking-[0.15em] text-gray-400 font-medium">
                            Try Triangulum
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Quiz
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Live polling
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="uppercase text-[13px] tracking-[0.15em] text-gray-400 font-medium">
                            Company
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Company
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Developers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="uppercase text-[13px] tracking-[0.15em] text-gray-400 font-medium">
                            Details
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Privacy policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Security
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Safety
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                >
                                    Legal
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
