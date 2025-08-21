'use client';
import HostLobbyFooter from './HostLobbyFooter';
import WaitingLobbyLeft from './WaitingLobbyHostLeft';

export default function HostLobbyScreen() {
    return (
        <div className="w-full h-full flex">
            <WaitingLobbyLeft />
            <HostLobbyFooter />
            {/* <WaitingLobbyHostRight /> */}
        </div>
    );
}
