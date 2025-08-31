'use client';
import { useEffect, useState } from 'react';
import AppLogo from '../app/AppLogo';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomeScreenFooter() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry) {
                    setIsVisible(entry.isIntersecting);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px 0px -50px 0px',
            },
        );

        const footerElement = document.getElementById('animated-footer');
        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => {
            if (footerElement) {
                observer.unobserve(footerElement);
            }
        };
    }, []);

    return (
        <footer
            id="animated-footer"
            className="relative w-full min-h-5xl mt-60 pb-60 text-white overflow-hidden select-none"
        >
            <div
                className={cn(
                    'absolute inset-0 transition-all duration-[1500ms] ease-out',
                    isVisible ? 'opacity-100' : 'opacity-0',
                )}
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

            <div
                className={cn(
                    'relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-20',
                    'transition-all duration-[1200ms] ease-out delay-300',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                )}
            >
                <div className="grid grid-cols-4 gap-40">
                    <div
                        className={cn(
                            'flex-col transition-all duration-1000 ease-out',
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                        )}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <span>
                            <AppLogo />
                        </span>
                        <div className="w-full flex gap-x-2 px-2.5 pt-4">
                            <span
                                className={cn(
                                    'h-10 w-10 rounded-full border p-2 flex justify-center items-center bg-neutral-900/70',
                                    'transition-all duration-700 ease-out hover:scale-110 hover:bg-neutral-800/80',
                                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                                )}
                                style={{ transitionDelay: '800ms' }}
                            >
                                <FaXTwitter className="h-4.5 w-4.5" />
                            </span>

                            <span
                                className={cn(
                                    'h-10 w-10 rounded-full border p-2 flex justify-center items-center bg-neutral-900/70',
                                    'transition-all duration-700 ease-out hover:scale-110 hover:bg-neutral-800/80',
                                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                                )}
                                style={{ transitionDelay: '900ms' }}
                            >
                                <FaGithub className="h-4.5 w-4.5" />
                            </span>
                        </div>

                        <div
                            className={cn(
                                'mx-2.5 px-6 py-1.5 gap-x-2 mt-4 bg-neutral-900/70 rounded-md border',
                                'flex justify-around items-center group cursor-pointer font-extralight tracking-wider',
                                'transition-all duration-700 ease-out hover:bg-neutral-800/80',
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                            )}
                            style={{ transitionDelay: '1000ms' }}
                        >
                            Developers
                            <ChevronRight className="size-6 transform transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </div>

                    {[
                        {
                            title: 'Try Triangulum',
                            items: ['Overview', 'Features', 'Quiz', 'Live polling'],
                            delay: '700ms',
                        },
                        {
                            title: 'Company',
                            items: ['Company', 'Developers', 'Contact'],
                            delay: '800ms',
                        },
                        {
                            title: 'Details',
                            items: [
                                'Documentation',
                                'Privacy policy',
                                'Security',
                                'Safety',
                                'Legal',
                            ],
                            delay: '900ms',
                        },
                    ].map((section, _sectionIndex) => (
                        <div
                            key={section.title}
                            className={cn(
                                'space-y-6 transition-all duration-1000 ease-out',
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                            )}
                            style={{ transitionDelay: section.delay }}
                        >
                            <h4 className="uppercase text-[13px] tracking-[0.15em] text-gray-400 font-medium">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.items.map((item, itemIndex) => (
                                    <li
                                        key={item}
                                        className={cn(
                                            'transition-all duration-700 ease-out',
                                            isVisible
                                                ? 'opacity-100 translate-x-0'
                                                : 'opacity-0 translate-x-2',
                                        )}
                                        style={{
                                            transitionDelay: `${parseInt(section.delay) + itemIndex * 100}ms`,
                                        }}
                                    >
                                        <a
                                            href="#"
                                            className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}
