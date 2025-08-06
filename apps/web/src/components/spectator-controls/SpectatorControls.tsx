import { PiDetectiveFill } from 'react-icons/pi';
import { RiMessage3Fill } from 'react-icons/ri';
import { MdLeaderboard } from "react-icons/md";
import ToolTipComponent from '../utility/TooltipComponent';
import { Button } from '../ui/button';



interface SpectatorControlsType {
    tooltip: string,
    icon: React.ReactNode,
    onClick: () => void
}

interface SpectatorControls {
    onClickPeople: () => void,
    onClickChat: () => void,
    onClickLeaderboard: () => void
}

export default function SpectatorControls({ onClickPeople, onClickChat, onClickLeaderboard }: SpectatorControls) {

    const allSpectatorControls: SpectatorControlsType[] = [
        {
            tooltip: "Leaderboard",
            icon: <MdLeaderboard className="" style={{ width: '28px', height: '28px' }} />,
            onClick: onClickLeaderboard,
        },
        {
            tooltip: "People in Room",
            icon: <PiDetectiveFill className="" style={{ width: '28px', height: '28px' }} />,
            onClick: onClickPeople
        },
        {
            tooltip: "Chat with others",
            icon: <RiMessage3Fill style={{ width: '28px', height: '28px' }} />,
            onClick: onClickChat
        }
    ];

    return <div className='flex'>
        {allSpectatorControls.map((control, index) => (
            <ToolTipComponent
                content={control.tooltip}
                key={index}
            >
                <Button
                    variant="ghost"
                    onClick={control.onClick}
                    className="hover:scale-105 dark:hover:bg-transparent transition-all duration-300"
                >
                    {control.icon}
                </Button>
            </ToolTipComponent>))}
    </div>

}