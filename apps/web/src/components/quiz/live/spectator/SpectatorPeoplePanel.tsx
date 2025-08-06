import { Button } from '@/components/ui/button';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { useLiveQuizExpandableCardForSpectatorStore } from '@/store/live-quiz/useLiveQuizExpandableCardForParticipantStore';
import { BiExpandAlt } from 'react-icons/bi';

export default function SpectatorPeoplePanel() {
    const { isExpanded, setIsExpanded } = useLiveQuizExpandableCardForSpectatorStore();
    function handleToggleExpand() {
        setIsExpanded(!isExpanded);
    }
    return (
        <div className="flex justify-between items-center px-7 py-4 border-b">
            <span className="text-sm dark:text-light-base text-dark-primary">Spectators</span>
            <ToolTipComponent content="Click to expand">
                <div>
                    <Button
                        className="text-dark-base dark:text-light-base cursor-pointer dark:bg-neutral-600/30 "
                        variant={'ghost'}
                        onClick={handleToggleExpand}
                    >
                        <BiExpandAlt className="dark:text-light-base" strokeWidth={0.5} />
                    </Button>
                </div>
            </ToolTipComponent>
        </div>
    );
}
