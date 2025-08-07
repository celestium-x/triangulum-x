'use client';
import HostLobbyFooter from './HostLobbyFooter';
import WaitingLobbyHostLeft from './WaitingLobbyHostLeft';

export default function HostLobbyScreen() {
    return (
        <div className="w-full h-full flex">
            <WaitingLobbyHostLeft />
            <HostLobbyFooter />
            {/* <WaitingLobbyHostRight /> */}
        </div>
    );
}
