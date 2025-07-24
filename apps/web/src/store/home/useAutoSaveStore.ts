import { create } from "zustand";

interface AutoSaveRendererTypes {
    enabledAutoSave: boolean,
    setEnableAutoSave: (val: boolean) => void;
}

export const useAutoSaveStore = create<AutoSaveRendererTypes>((set) => ({
    enabledAutoSave: true,
    setEnableAutoSave: (val) => set({ enabledAutoSave: val })
}))