import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { JSX } from "react";
import {
    TbSquareLetterTFilled,
    TbDashboard,
    TbPlus,
    TbTrophy,
    TbChartBar,
    TbWallet,
    TbCrown,
    TbHistory,
    TbSettings,
    TbHelp,
} from "react-icons/tb";

interface DashboardLeftProps {
    isExpanded: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export default function DashboardLeft({
    isExpanded,
    onMouseEnter,
    onMouseLeave
}: DashboardLeftProps): JSX.Element {
    return (
        <motion.div
            className={cn("h-full bg-light-base dark:bg-dark-base/10 shrink-0",
                "flex flex-col justify-start items-center py-6"
            )}
            initial={{ width: "68px" }}
            animate={{
                width: isExpanded ? "300px" : "68px",
            }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <LogoOption
                icon={<TbSquareLetterTFilled
                    size={28}
                    className="group-hover:-translate-x-1 transition-transform ease-in"
                />}
                label="Triangulum"
                isExpanded={isExpanded}
            />

            <div className="mt-8 w-full space-y-1 pl-2 flex flex-col gap-y-2">
                <NavOption
                    icon={<TbDashboard size={20} />}
                    label="Dashboard"
                    isExpanded={isExpanded}
                />
                <NavOption
                    icon={<TbTrophy size={20} />}
                    label="My Quizzes"
                    isExpanded={isExpanded}
                />
                <NavOption
                    icon={<TbPlus size={20} />}
                    label="Create Quiz"
                    isExpanded={isExpanded}
                />
                <NavOption
                    icon={<TbChartBar size={20} />}
                    label="Analytics"
                    isExpanded={isExpanded}
                />
                <NavOption
                    icon={<TbWallet size={20} />}
                    label="Wallet"
                    isExpanded={isExpanded}
                />
                <NavOption
                    icon={<TbCrown size={20} />}
                    label="Leaderboards"
                    isExpanded={isExpanded}
                />
                <NavOption
                    icon={<TbHistory size={20} />}
                    label="History"
                    isExpanded={isExpanded}
                />
            </div>

            <div className="mt-auto w-full space-y-1 pl-2">
                <NavOption
                    icon={<TbSettings size={20} />}
                    label="Settings"
                    isExpanded={isExpanded}
                />
                <NavOption
                    icon={<TbHelp size={20} />}
                    label="Help & Support"
                    isExpanded={isExpanded}
                />
            </div>
        </motion.div>
    );
}

interface OptionProps {
    isExpanded: boolean;
    icon: React.ReactNode;
    label: string;
}

function LogoOption({ isExpanded, icon, label }: OptionProps) {
    return (
        <div className="flex items-center justify-start gap-3 w-full px-4 h-10">
            <div className="flex items-center justify-center shrink-0">
                {icon}
            </div>
            <motion.span
                animate={{
                    display: isExpanded ? "inline-block" : "none",
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                    delay: isExpanded ? 0.1 : 0,
                }}
                className="text-xl text-dark-base dark:text-light-base font-bold whitespace-nowrap overflow-hidden leading-none"
            >
                {label}
            </motion.span>
        </div>
    );
}

function NavOption({ isExpanded, icon, label }: OptionProps) {
    return (
        <div className="flex items-center justify-start gap-3 w-full px-4 h-10 hover:bg-light-base dark:hover:bg-dark-primary rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center justify-center shrink-0 w-5 h-5">
                {icon}
            </div>
            <motion.span
                animate={{
                    display: isExpanded ? "inline-block" : "none",
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                    delay: isExpanded ? 0.1 : 0,
                }}
                className="text-sm text-dark-primary dark:text-light-base font-medium whitespace-nowrap overflow-hidden leading-none"
            >
                {label}
            </motion.span>
        </div>
    );
}