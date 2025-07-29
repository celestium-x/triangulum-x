import { create } from "zustand";


interface SideBarStore {
    appearing: boolean,
    setAppearing: (appearing: boolean) => void
}

export const useSideBarStore = create<SideBarStore>((set) => ({
    appearing: false,
    setAppearing: (appearing: boolean) => set({ appearing: appearing })
}))