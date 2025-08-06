import { Button } from '@/components/ui/button';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { IoMdSettings } from 'react-icons/io';
import { MdLeaderboard } from 'react-icons/md';
import { PiDetectiveFill } from 'react-icons/pi';
import { RiMessage3Fill } from 'react-icons/ri';

interface SpectatorControlsType {
    tooltip: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface SpectatorControlsProps {
    onClickPeople: () => void;
    onClickChat: () => void;
    onClickLeaderboard: () => void;
    onClickSettings: () => void;
}

export default function SpectatorControls({
    onClickPeople,
    onClickSettings,
    onClickChat,
    onClickLeaderboard,
}: SpectatorControlsProps) {
    const allHostControls: SpectatorControlsType[] = [
        {
            tooltip: 'Leaderboard',
            icon: <MdLeaderboard className="" style={{ width: '28px', height: '28px' }} />,
            onClick: onClickLeaderboard,
        },
        {
            tooltip: 'People in Room',
            icon: <PiDetectiveFill className="" style={{ width: '28px', height: '28px' }} />,
            onClick: onClickPeople,
        },
        {
            tooltip: 'Chat with others',
            icon: <RiMessage3Fill style={{ width: '28px', height: '28px' }} />,
            onClick: onClickChat,
        },
        {
            tooltip: 'Settings',
            icon: <IoMdSettings style={{ width: '28px', height: '28px' }} />,
            onClick: onClickSettings,
        },
    ];
    return (
        <div className="flex">
            {allHostControls.map((control, index) => (
                <ToolTipComponent content={control.tooltip} key={index}>
                    <Button
                        variant="ghost"
                        onClick={control.onClick}
                        className="hover:scale-105 dark:hover:bg-transparent transition-all duration-300"
                    >
                        {control.icon}
                    </Button>
                </ToolTipComponent>
            ))}
        </div>
    );
}
