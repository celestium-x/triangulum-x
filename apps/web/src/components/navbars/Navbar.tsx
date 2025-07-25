import AppLogo from "../app/AppLogo";
import NavItems from "./NavItems";
import DarkModeToggle from "../base/DarkModeToggle";
import NavbarSigninAction from "./NavbarSigninAction";

const navItems = [
    {
        name: "Features",
        link: "#features",
    },
    {
        name: "Pricing",
        link: "#pricing",
    },
    {
        name: "Contact",
        link: "#contact",
    },
];

export default function Navbar() {


    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2  w-full max-w-4xl px-4 py-4 rounded-lg shadow-lg border bg-light-base dark:bg-dark-base">
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
