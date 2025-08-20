'use client';
import AppLogo from '../app/AppLogo';
import NavItems from './NavItems';
import DarkModeToggle from '../base/DarkModeToggle';
import NavbarSigninAction from './NavbarSigninAction';
import { useEffect, useState } from 'react';

const navItems = [
    {
        name: 'Features',
        link: '#features',
    },
    {
        name: 'Pricing',
        link: '#pricing',
    },
    {
        name: 'Contact',
        link: '#contact',
    },
];

export default function Navbar() {
    const [atTop, setAtTop] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setAtTop(true);
            } else {
                setAtTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed left-1/2 -translate-x-1/2 w-screen px-4 py-4 z-[100] transition-all duration-400 ease-in-out border
        ${
            atTop
                ? 'max-w-7xl top-1 border-none'
                : 'rounded-2xl shadow-lg top-4 border max-w-4xl bg-gradient-to-b dark:from-[#1c1c1c] dark:via-neutral-900 dark:to-[#1c1c1c] from-neutral-200 via-neutral-100 to-neutral-200'
        }`}
        >
            <div className="px-4 flex items-center justify-between w-full">
                <AppLogo />

                <div className="flex">
                    <DarkModeToggle />
                    <NavItems items={navItems} isAtTop={atTop}></NavItems>
                </div>

                <NavbarSigninAction />
            </div>
        </div>
    );
}
