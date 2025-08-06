'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Message, User } from './specTypes';
import SpectatorsDisplay from './chat/SpectatorsDisplay';
import { FcGlobe } from 'react-icons/fc';
import { cn } from '@/lib/utils';
import { useLiveSpectatorsStore } from '@/store/live-quiz/useLiveSpectatorStore';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { templates } from '@/lib/templates';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import SpectatorControls from './SpectatorControls';
import { MdLeaderboard } from 'react-icons/md';
import ExpandablePanel from './ExpandablePanel';

interface SpectatorActionsProps {
    onChatExpandChange?: (isExpanded: boolean) => void;
}

export default function SpectatorActions({ onChatExpandChange }: SpectatorActionsProps) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const spectatorChatRef = useRef<HTMLDivElement>(null);
    const spectatorsDisplayRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [openChatDropdown, setOpenChatDropdown] = useState<boolean>(false);
    const [isChatExpanded, setIsChatExpanded] = useState<boolean>(false);

    const [openLeaderBoardDropdown, setOpenLeaderBoardDropDown] = useState<boolean>(false);
    const [isLeaderBoardExpanded, setIsLeaderBoardExpanded] = useState<boolean>(false);

    const [openPeopleDropdown, setOpenPeopleDropdown] = useState<boolean>(false);

    const { quiz } = useLiveQuizStore();

    const template = templates.find((t) => t.id === quiz?.theme);

    const { spectators, currentUserId } = useLiveSpectatorsStore();

    useEffect(() => {
        onChatExpandChange?.(isChatExpanded);
    }, [isChatExpanded, onChatExpandChange]);


    useHandleClickOutside([spectatorChatRef], setOpenChatDropdown);
    useHandleClickOutside([spectatorsDisplayRef], setOpenPeopleDropdown);

    const users: User[] = useMemo(() => {
        const globalChat: User = {
            id: 'global',
            name: 'Global Chat',
            svg: (
                <FcGlobe
                    className="text-dark-base dark:text-light-base"
                    style={{ width: '28px', height: '28px' }}
                />
            ),
        };

        const spectatorUsers: User[] = spectators.map((s) => ({
            id: s.id,
            name: s.nickname || 'Anonymous',
            avatar: s.avatar || '',
            isCurrentUser: currentUserId === s.id,
        }));

        return [globalChat, ...spectatorUsers];
    }, [spectators, currentUserId]);

    const [selectedUser, setSelectedUser] = useState<User>(users[0]!);
    const newMessage = messages[selectedUser.id];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [newMessage]);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => ({
            ...prev,
            [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
        }));

        setTimeout(
            () => {
                const responses = [
                    'Kaise ho g!',
                    'Mai bhi badiya!',
                    'Kuch nahi timepass',
                    'This chat is so fun!',
                    'Keep the good vibes coming!',
                ];

                const response: Message = {
                    id: (Date.now() + 1).toString(),
                    text: responses[Math.floor(Math.random() * responses.length)],
                    sender: 'other',
                    timestamp: new Date(),
                };

                setMessages((prev) => ({
                    ...prev,
                    [selectedUser.id]: [...(prev[selectedUser.id] || []), response],
                }));
            },
            1000 + Math.random() * 2000,
        );
    };

    return (
        <div
            className="h-full"
            style={{
                color: template?.text_color,
            }}
        >
            <div
                className={cn(
                    `fixed bottom-3 z-50 flex gap-1 border rounded-3xl p-2`,
                    isChatExpanded ? (openPeopleDropdown || openChatDropdown ? (openPeopleDropdown ? 'right-4' : 'right-150') : 'right-4') : 'right-4'
                )}
            >

                <SpectatorControls
                    onClickPeople={() => {
                        setOpenChatDropdown(false);
                        setOpenLeaderBoardDropDown(false);
                        setOpenPeopleDropdown((prev) => !prev);
                    }}
                    onClickChat={() => {
                        setOpenPeopleDropdown(false);
                        setOpenLeaderBoardDropDown(false);
                        setOpenChatDropdown((prev) => !prev);
                    }}
                    onClickLeaderboard={() => {
                        setOpenChatDropdown(false);
                        setOpenPeopleDropdown(false);
                        setOpenLeaderBoardDropDown(prev => !prev);
                    }}
                />

            </div>

            {openPeopleDropdown && (
                <SpectatorsDisplay
                    ref={spectatorsDisplayRef}
                    users={users}
                    onSelectUser={(user) => {
                        setSelectedUser(user);
                        setOpenChatDropdown(true);
                        setOpenPeopleDropdown(false);
                    }}
                />
            )}

            {openChatDropdown && (
                <ExpandablePanel
                    type='chat'
                    ref={spectatorChatRef}
                    bottomRef={bottomRef}
                    data={selectedUser}
                    selectedUser={selectedUser}
                    messages={messages}
                    onToggleExpand={() => setIsChatExpanded(prev => !prev)}
                    isExpanded={isChatExpanded}
                    onSendMessage={handleSendMessage}
                />
            )}
            {openLeaderBoardDropdown && (
                <ExpandablePanel
                    type='leaderboard'
                    ref={spectatorChatRef}
                    data={{
                        title: "Leaderboard",
                        svg: <MdLeaderboard className="" style={{ width: '28px', height: '28px' }} />
                    }}
                    onToggleExpand={() => setIsLeaderBoardExpanded(prev => !prev)}
                    isExpanded={isLeaderBoardExpanded}
                />
            )}
        </div>
    );
}
