import AppLogo from "../app/AppLogo";
import { Button } from "../ui/button";
import { MdChevronRight } from "react-icons/md";
import NavItems from "./NavItems";
import DarkModeToggle from "../base/DarkModeToggle";
import { cn } from "@/lib/utils";

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
        <div className="absolute top-4 left-1/2 -translate-x-1/2  w-full max-w-4xl px-4 py-4 rounded-lg shadow-lg border dark:bg-dark-base">
            <div className="mx-4 flex items-center justify-between">
                <AppLogo />

                <div className="flex">
                    <DarkModeToggle />
                    <NavItems items={navItems}></NavItems>
                </div>

                <Button className={cn("font-light text-sm tracking-wider  flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10]",
                    "bg-dark-base dark:bg-light-base"
                )}>

                    <span>Sign in</span>
                    <MdChevronRight className="text-neutral-300 dark:text-dark-base" />
                </Button>
            </div>
        </div>
    );
}
