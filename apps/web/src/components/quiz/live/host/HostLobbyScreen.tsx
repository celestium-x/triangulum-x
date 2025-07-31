'use client';
import WaitingLobbyAvatars from "../common/WaitingLobbyAvatars";

export default function HostLobbyScreen() {
    return (
        <div className="w-full h-full flex">
            <WaitingLobbyAvatars />
            <div className="h-screen w-[32rem] bg-light-base dark:bg-neutral-900 rounded-l-xl border-l dark:border-neutral-700 border-neutral-200 z-[20] shadow-2xl">
            </div>
        </div>
    )
}