import AppLogo from '../app/AppLogo';
import NavItems from './NavItems';
import DarkModeToggle from '../base/DarkModeToggle';
import NavbarSigninAction from './NavbarSigninAction';

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
    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 py-4 rounded-2xl shadow-lg border bg-gradient-to-b dark:from-[#1c1c1c] dark:via-neutral-900 dark:to-[#1c1c1c] from-neutral-200 via-neutral-100 to-neutral-200 z-[100]">
            <div className="px-4 flex items-center justify-between w-full">
                <AppLogo />

                <div className="flex">
                    <DarkModeToggle />
                    <NavItems items={navItems}></NavItems>
                </div>

                <NavbarSigninAction />
            </div>
        </div>
    );
}
