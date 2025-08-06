import { create } from 'zustand';

interface LiveQuizExpandableCardStore {
    type: 'CHAT' | 'LEADERBOARD' | 'PEOPLE' | 'SETTINGS' | null;
    setType: (type: 'CHAT' | 'LEADERBOARD' | 'PEOPLE' | 'SETTINGS' | null) => void;
    isExpanded: boolean;
    setIsExpanded: (open: boolean) => void;
}

export const useLiveQuizExpandableCardForHostStore = create<LiveQuizExpandableCardStore>((set) => ({
    type: null,
    setType: (type: 'CHAT' | 'LEADERBOARD' | 'PEOPLE' | 'SETTINGS' | null) => {
        set(() => ({
            type,
        }));
    },
    isExpanded: false,
    setIsExpanded: (open: boolean) => {
        set(() => ({
            isExpanded: open,
        }));
    },
}));
