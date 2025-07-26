import { cn } from '@/lib/utils';
import { useHomeRendererStore } from '@/store/home/useHomeRendererStore';
import { HomeRendererEnum } from '@/types/homeRendererTypes';
import { JSX } from 'react';
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
} from 'react-icons/tb';

export default function DashboardLeft(): JSX.Element {
    const { value, setValue } = useHomeRendererStore();
    return (
        <div
            className={cn(
                'h-full bg-light-base dark:bg-dark-base/10 shrink-0 w-[300px]',
                'flex flex-col justify-start items-center py-6',
            )}
        >
            <LogoOption
                icon={
                    <TbSquareLetterTFilled
                        size={28}
                        className="group-hover:-translate-x-1 transition-transform ease-in"
                    />
                }
                label="Triangulum"
            />

            <div className="mt-8 w-full space-y-1 pl-2 flex flex-col gap-y-2">
                <NavOption
                    icon={<TbDashboard size={20} />}
                    label="Dashboard"
                    onClick={() => setValue(HomeRendererEnum.DASHBOARD)}
                    isActive={value === HomeRendererEnum.DASHBOARD}
                />
                <NavOption
                    icon={<TbTrophy size={20} />}
                    label="My Quizzes"
                    onClick={() => setValue(HomeRendererEnum.MY_QUIZ)}
                    isActive={value === HomeRendererEnum.MY_QUIZ}
                />
                <NavOption
                    icon={<TbPlus size={20} />}
                    label="Create Quiz"
                    onClick={() => setValue(HomeRendererEnum.CREATE_QUIZ)}
                    isActive={value === HomeRendererEnum.CREATE_QUIZ}
                />
                <NavOption
                    icon={<TbChartBar size={20} />}
                    label="Analytics"
                    onClick={() => setValue(HomeRendererEnum.ANALYTICS)}
                    isActive={value === HomeRendererEnum.ANALYTICS}
                />
                <NavOption
                    icon={<TbWallet size={20} />}
                    label="Wallet"
                    onClick={() => setValue(HomeRendererEnum.WALLET)}
                    isActive={value === HomeRendererEnum.WALLET}
                />
                <NavOption
                    icon={<TbCrown size={20} />}
                    label="Leaderboards"
                    onClick={() => setValue(HomeRendererEnum.LEADERBOARD)}
                    isActive={value === HomeRendererEnum.LEADERBOARD}
                />
                <NavOption
                    icon={<TbHistory size={20} />}
                    label="History"
                    onClick={() => setValue(HomeRendererEnum.HISTORY)}
                    isActive={value === HomeRendererEnum.HISTORY}
                />
            </div>

            <div className="mt-auto w-full space-y-1 pl-2">
                <NavOption
                    icon={<TbSettings size={20} />}
                    label="Settings"
                    onClick={() => setValue(HomeRendererEnum.SETTINGS)}
                    isActive={value === HomeRendererEnum.SETTINGS}
                />
                <NavOption
                    icon={<TbHelp size={20} />}
                    label="Help & Support"
                    onClick={() => setValue(HomeRendererEnum.HELP)}
                    isActive={value === HomeRendererEnum.HELP}
                />
            </div>
        </div>
    );
}

interface OptionProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    isActive?: boolean;
}

function LogoOption({ icon, label }: OptionProps) {
    return (
        <button className="flex items-center justify-start gap-3 w-full px-4 h-10">
            <div className="flex items-center justify-center shrink-0">{icon}</div>
            <span className="text-xl text-dark-base dark:text-light-base font-bold whitespace-nowrap overflow-hidden leading-none">
                {label}
            </span>
        </button>
    );
}

function NavOption({ icon, label, onClick, isActive }: OptionProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex items-center justify-start gap-3 w-full px-4 h-10 hover:bg-light-base dark:hover:bg-dark-primary rounded-lg cursor-pointer transition-colors',
                isActive && 'bg-light-base dark:bg-dark-primary',
            )}
        >
            <div className="flex items-center justify-center shrink-0 w-5 h-5">{icon}</div>
            <span className="text-sm text-dark-primary dark:text-light-base font-normal whitespace-nowrap overflow-hidden leading-none">
                {label}
            </span>
        </div>
    );
}
