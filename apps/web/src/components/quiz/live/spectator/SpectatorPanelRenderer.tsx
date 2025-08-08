import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { useRef } from 'react';
import ExpandableCard from '../common/ExpandableCard';
import SpectatorChatPanel from './SpectatorChatPanel';
import SpectatorPeoplePanel from './SpectatorPeoplePanel';
import { useLiveQuizExpandableCardForSpectatorStore } from '@/store/live-quiz/useLiveQuizExpandableCardForSpectatorStore';
import SpectatorLeaderboardPanel from './SpectatorLeaderboardPanel';
import SpectatorSettingsPanel from './SpectatorSettingsPanel';

export default function SpectatorPanelRenderer() {
    const expandableCardRef = useRef<HTMLDivElement>(null);
    const { type, setType, setIsExpanded, isExpanded } =
        useLiveQuizExpandableCardForSpectatorStore();
    function handleClickOutside() {
        setType(null);
        setIsExpanded(false);
    }

    function renderer() {
        switch (type) {
            case 'CHAT':
                return <SpectatorChatPanel />;
            case 'PEOPLE':
                return <SpectatorPeoplePanel />;
            case 'LEADERBOARD':
                return <SpectatorLeaderboardPanel />;
            case 'SETTINGS':
                return <SpectatorSettingsPanel />;
            default:
                return <></>;
        }
    }

    useHandleClickOutside([expandableCardRef], handleClickOutside);
    return (
        type && (
            <ExpandableCard
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
                ref={expandableCardRef}
            >
                {renderer()}
            </ExpandableCard>
        )
    );
}
