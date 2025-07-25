import { create } from "zustand";

export enum DraftRenderer {
    THEME = 'THEME',
    QUESTION = 'QUESTION',
    INTERACTION = 'INTERACTION',
    ADVANCED = 'ADVANCED',
    STAKE = 'STAKE',
    AUTO_SAVE="AUTO_SAVE",
    NONE = 'NONE',
}

interface DraftRendererStoreTypes {
    state: DraftRenderer;
    setState: (state: DraftRenderer) => void;
}

export const useDraftRendererStore = create<DraftRendererStoreTypes>((set) => ({
    state: DraftRenderer.QUESTION,
    setState: (state) => set({ state })
}))