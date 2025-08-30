import { create } from 'zustand';

interface JoinQuizButtonStore {
    showJoinInput: boolean;
    setShowJoinInput: (value: boolean) => void;
}

export const useJoinQuizStore = create<JoinQuizButtonStore>((set) => ({
    showJoinInput: false,
    setShowJoinInput: (value: boolean) => set({ showJoinInput: value }),
}));
