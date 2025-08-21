import { useRef } from 'react';
import ExpandableCard from '../../common/ExpandableCard';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import HostChatsPanel from './HostChatsPanel';
import { useLiveQuizExpandableCardForHostStore } from '@/store/live-quiz/useLiveQuizExpandableCardForHostStore';
import HostSettingsPanel from './HostSettingsPanel';
import HostPeoplePanel from './HostPeoplePanel';
import HostLeaderboardPanel from '../HostLeaderboard';

export default function HostPanelRenderer() {
    const expandableCardRef = useRef<HTMLDivElement>(null);
    const { type, setType, setIsExpanded, isExpanded } = useLiveQuizExpandableCardForHostStore();
    function handleClickOutside() {
        setType(null);
        setIsExpanded(false);
    }

    function renderer() {
        switch (type) {
            case 'CHAT':
                return <HostChatsPanel />;
            case 'PEOPLE':
                return <HostPeoplePanel />;
            case 'SETTINGS':
                return <HostSettingsPanel />;
            case 'LEADERBOARD':
                return <HostLeaderboardPanel />;
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
