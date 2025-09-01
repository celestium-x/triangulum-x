'use client';
import DeveloperCard from '@/components/founders/DeveloperCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLogo from '../app/AppLogo';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { cn } from '@/lib/utils';

type FooterSection = {
    title: string;
    items: { label: string; href: string }[];
    delay: string;
};

const footerSections: FooterSection[] = [
    {
        title: 'Try Triangulum',
        items: [
            { label: 'Overview', href: '/overview' },
            { label: 'Features', href: '/features' },
            { label: 'Quiz', href: '/quiz' },
            { label: 'Live polling', href: '/live-polling' },
        ],
        delay: '700ms',
    },
    {
        title: 'Company',
        items: [
            { label: 'Company', href: '/company' },
            { label: 'Founders', href: '/founders' },
            { label: 'Contact', href: '/contact' },
        ],
        delay: '800ms',
    },
    {
        title: 'Details',
        items: [
            { label: 'Documentation', href: '/docs' },
            { label: 'Privacy policy', href: '/privacy' },
            { label: 'Security', href: '/security' },
            { label: 'Safety', href: '/safety' },
            { label: 'Legal', href: '/legal' },
        ],
        delay: '900ms',
    },
];
const animations = `
  @keyframes fadeInLight {
    0% { opacity: 0; filter: blur(100px); }
    100% { opacity: 1; filter: blur(80px); }
  }
  @keyframes slideDownFade {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

export default function FounderBase() {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const footerElement = document.getElementById('animated-footer');
        if (!footerElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry) {
                    setIsVisible(entry.isIntersecting);
                }
            },
            { threshold: 0.1, rootMargin: '50px 0px -50px 0px' },
        );

        observer.observe(footerElement);
        return () => observer.unobserve(footerElement);
    }, []);

    return (
        <div className="relative w-full flex flex-col items-center justify-between text-white bg-[#101214] select-none overflow-x-hidden">
            <style>{animations}</style>

            <div className="absolute top-0 left-0 w-[140vh] h-[120vh] pointer-events-none overflow-hidden">
                <div
                    className="w-full h-full"
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(149,115,225,0.3) 0%, rgba(149,115,225,0) 60%)',
                        filter: 'blur(120px)',
                        transform: 'rotate(-20deg) translate(-40%, -40%)',
                        transformOrigin: 'top left',
                        animation: 'fadeInLight 1.8s ease-out forwards',
                    }}
                />
            </div>

            <div
                className="absolute h-full w-full max-h-[80px] border-b flex justify-start items-center px-3 sm:px-5"
                style={{ animation: 'slideDownFade 1s ease-out forwards' }}
            >
                <AppLogo />
            </div>

            <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-5xl border-l border-r pt-[80px] flex flex-col mx-auto px-2 sm:px-0">
                <div
                    className="h-16 sm:h-20 w-full border-b flex p-3 sm:p-6 text-sm sm:text-md items-center justify-between font-light"
                    style={{ animation: 'slideDownFade 1.2s ease-out forwards' }}
                >
                    <div className="text-xs sm:text-sm md:text-[18px] tracking-wider">
                        MEET THE FOUNDERS
                    </div>
                    <div className="flex gap-x-0.5">
                        <span
                            className={cn(
                                'social-item flex justify-center items-center',
                                'h-8 w-8 sm:h-9 sm:w-9 rounded-[12px] font-sans transition duration-200',
                            )}
                        >
                            <FaXTwitter className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                        </span>
                        <span
                            className={cn(
                                'social-item flex justify-center items-center',
                                'h-8 w-8 sm:h-9 sm:w-9 rounded-[12px] font-sans transition duration-200',
                            )}
                        >
                            <FaGithub className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                        </span>
                    </div>
                </div>

                <DeveloperCard
                    name="Rishi Kant"
                    role="FullStack Developer"
                    image="/images/founders/rishi.jpg"
                    twitterUrl="https://x.com/khairrishi"
                    linkedinUrl="https://www.linkedin.com/in/kant-linked/"
                    githubUrl="https://github.com/kant-github"
                    githubUsername="kant-github"
                    className="border-b"
                />
                <DeveloperCard
                    name="Anjan Suman"
                    role="FullStack Developer"
                    image="/images/founders/anjan.jpg"
                    twitterUrl="https://x.com/AnjanSuman8"
                    linkedinUrl="https://www.linkedin.com/in/anjansuman/"
                    githubUrl="https://github.com/Anjansuman"
                    githubUsername="Anjansuman"
                    className="border-b"
                />
                <DeveloperCard
                    name="Piyush Raj"
                    role="FullStack Developer"
                    image="/images/founders/piyush.jpg"
                    twitterUrl="https://x.com/PiyushC2P"
                    linkedinUrl="https://www.linkedin.com/in/piyush-raj-07a318260/"
                    githubUrl="https://github.com/piyush-rj"
                    githubUsername="piyush-rj"
                    className="border-b"
                />
                <DeveloperCard
                    name="Dipanshu Raj"
                    role="FullStack Developer"
                    image="/images/founders/dipanshu.jpg"
                    twitterUrl="https://x.com/DipTheBeginner"
                    linkedinUrl="https://www.linkedin.com/in/dipthebeginner/"
                    githubUrl="https://github.com/DipTheBeginner"
                    githubUsername="DipTheBeginner"
                />
            </div>

            <footer
                id="animated-footer"
                className="relative w-full text-white overflow-hidden select-none border-t"
            >
                <div
                    className={cn(
                        'absolute inset-0 transition-all duration-[1500ms] ease-out',
                        isVisible ? 'opacity-100' : 'opacity-0',
                    )}
                    style={{
                        background: `
                                radial-gradient(ellipse at center bottom, 
                                    rgba(120, 80, 200, 0.3) 0%, 
                                    rgba(100, 70, 180, 0.25) 15%, 
                                    rgba(80, 60, 160, 0.2) 25%, 
                                    rgba(60, 50, 140, 0.15) 35%, 
                                    rgba(40, 40, 120, 0.12) 45%, 
                                    rgba(30, 30, 100, 0.1) 55%, 
                                    #101214 65%, 
                                    #101214 90%
                                )
                            `,
                    }}
                />

                <div
                    className={cn(
                        'relative z-10 max-w-7xl mx-auto pt-20 pb-32',
                        'transition-all duration-[1200ms] ease-out delay-200',
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    )}
                >
                    <div className="grid grid-cols-4 gap-x-45">
                        <div
                            className={cn(
                                'flex-col transition-all duration-1000 ease-out',
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                            )}
                            style={{ transitionDelay: '600ms' }}
                        >
                            <AppLogo />
                            <div className="w-full flex gap-x-2 px-2.5 pt-4">
                                {[FaXTwitter, FaGithub].map((Icon, idx) => (
                                    <span
                                        key={idx}
                                        className={cn(
                                            'h-10 w-10 rounded-full border p-2 flex justify-center items-center bg-neutral-900/70',
                                            'transition-all duration-700 ease-out hover:scale-110 hover:bg-neutral-800/80',
                                            isVisible
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-95',
                                        )}
                                        style={{
                                            transitionDelay: `${800 + idx * 100}ms`,
                                        }}
                                    >
                                        <Icon className="h-4.5 w-4.5" />
                                    </span>
                                ))}
                            </div>
                        </div>

                        {footerSections.map((section) => (
                            <div
                                key={section.title}
                                className={cn(
                                    'space-y-6 transition-all duration-1000 ease-out',
                                    isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-6',
                                )}
                                style={{ transitionDelay: section.delay }}
                            >
                                <h4 className="uppercase text-[13px] tracking-[0.15em] text-gray-400 font-medium">
                                    {section.title}
                                </h4>
                                <ul className="space-y-4">
                                    {section.items.map((item, itemIndex) => (
                                        <li
                                            key={item.label}
                                            className={cn(
                                                'transition-all duration-700 ease-out cursor-pointer',
                                                isVisible
                                                    ? 'opacity-100 translate-x-0'
                                                    : 'opacity-0 translate-x-2',
                                            )}
                                            style={{
                                                transitionDelay: `${
                                                    parseInt(section.delay) + itemIndex * 100
                                                }ms`,
                                            }}
                                            onClick={() => router.push(item.href)}
                                        >
                                            <span className="text-gray-200 hover:text-[#9573E1] transition-colors duration-300 text-sm">
                                                {item.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
