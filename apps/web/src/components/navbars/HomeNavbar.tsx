'use client'
import AppLogo from "../app/AppLogo";
import NavItems from "./NavItems";
import DarkModeToggle from "../base/DarkModeToggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Wallet, BarChart3, Circle } from "lucide-react";
import ProfileMenu from "../utility/ProfileMenu";
import { useRouter } from "next/navigation";
import { v4 as uuid } from 'uuid'


export default function HomeNavbar() {
    const isWalletConnected = false;
    const walletAddress = "";
    const router = useRouter();

    const navItems = [
        {
            name: "My Quizzes",
            link: "/dashboard/quizzes",
            icon: <BarChart3 className="w-4 h-4" />
        },
        {
            name: "Analytics",
            link: "/dashboard/analytics",
            icon: <BarChart3 className="w-4 h-4" />
        },
    ];

    function truncateAddress(address: string) {
        if (!address) return "";
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    function createNewQuizHandler() {
        const newQuizUuid = uuid();
        router.push(`new/${newQuizUuid}`)
    }

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 py-4 rounded-lg shadow-lg border dark:bg-dark-base bg-light-base">
            <div className="px-4 flex items-center justify-between w-full">
                <AppLogo />

                <div className="flex items-center gap-x-4">
                    <DarkModeToggle />
                    <NavItems items={navItems} />
                </div>

                <div className="flex items-center justify-center gap-x-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "font-light text-[13px] tracking-wide flex items-center gap-x-2 transition-transform hover:-translate-y-0.5",
                            isWalletConnected
                                ? "text-green-600 border-green-600/30 dark:border-green-600/30 bg-green-50 dark:bg-green-950/10 hover:!text-green-600 hover:!border-green-600/30 hover:!bg-green-50 dark:hover:!bg-green-950/10"
                                : "text-primary border-primary hover:!text-primary "
                        )}
                    >
                        <Wallet className="w-4 h-4" />
                        {isWalletConnected ? truncateAddress(walletAddress) : "Connect Wallet"}
                        {isWalletConnected && (
                            <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                        )}
                    </Button>

                    <Button onClick={createNewQuizHandler} className={cn(
                        "font-light text-[13px] tracking-wide flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10] rounded-lg",
                        "bg-dark-base dark:bg-light-base dark:hover:bg-light-base hover:bg-dark-base"
                    )}>
                        Create Quiz
                    </Button>

                    <ProfileMenu />

                </div>
            </div>
        </div>
    );
}