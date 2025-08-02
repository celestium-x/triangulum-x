'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Message, User } from './specTypes';
import SpectatorChatToggleButton from './chat/SpectatorChatToggleButton';
import SpectatorsDisplay from './chat/SpectatorsDisplay';
import SpectatorChatHeader from './chat/SpectatorChatHeader';
import SpectatorMessageItem from './chat/SpectatorMessageItem';
import SpectatorChatInput from './chat/SpectatorChatInput';
import SpectatorButton from './chat/SpectatorButton';
import { FaGlobeAmericas } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const roomUsers: User[] = [
    {
        id: 'global',
        name: 'Global Chat',
        isOnline: true,
        svg: (
            <FaGlobeAmericas
                className="text-dark-base dark:text-light-base "
                style={{ width: '28px', height: '28px' }}
            />
        ),
    },
    {
        id: '2',
        name: 'Alex',
        isOnline: true,
        avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-1.jpg',
    },
    {
        id: '3',
        name: 'Maya',
        isOnline: true,
        avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-2.jpg',
    },
    {
        id: '4',
        name: 'Raj',
        isOnline: true,
        avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-3.jpg',
    },
    {
        id: '5',
        name: 'Lena',
        isOnline: true,
        avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-4.jpg',
    },
];

export default function SpectatorActions() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [openChatDropdown, setOpenChatDropdown] = useState(false);
    const [openPeopleDropdown, setOpenPeopleDropdown] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>(roomUsers[0]!);
    const [isExpanded, setIsExpanded] = useState(false);

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
        <>
            <div
                className={`fixed bottom-3 z-50 flex gap-1 border rounded-3xl p-2 ${isExpanded ? (openPeopleDropdown || openChatDropdown ? (openPeopleDropdown ? 'right-4' : 'right-150') : 'right-4') : 'right-4'}`}
            >
                <SpectatorButton
                    onClick={() => {
                        setOpenChatDropdown(false);
                        setOpenPeopleDropdown((prev) => !prev);
                    }}
                />

                <SpectatorChatToggleButton
                    onClick={() => {
                        setOpenPeopleDropdown(false);
                        setOpenChatDropdown((prev) => !prev);
                    }}
                />
            </div>

            {openPeopleDropdown && (
                <SpectatorsDisplay
                    users={roomUsers}
                    onSelectUser={(user) => {
                        setSelectedUser(user);
                        setOpenChatDropdown(true);
                        setOpenPeopleDropdown(false);
                    }}
                />
            )}

            {openChatDropdown && (
                <div
                    key="chatbox"
                    className={cn(
                        'fixed p-0 z-40 rounded-xl transition-all',
                        'duration-300 ease-in-out',
                        'border border-neutral-200 dark:border-neutral-700 bg-light-base dark:bg-neutral-900',
                        'shadow-2xl',
                        isExpanded
                            ? 'right-0 rounded-r-none max-w-[40vw] w-[40vw] h-full'
                            : 'bottom-22 right-15 w-md h-[45rem] rounded-br-none',
                    )}
                >
                    <div className="relative h-full flex flex-col pb-1">
                        <SpectatorChatHeader
                            user={selectedUser}
                            onToggleExpand={() => setIsExpanded((prev) => !prev)}
                        />
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <div className="min-h-full flex flex-col justify-end">
                                {(messages[selectedUser.id] || []).map((message) => (
                                    <SpectatorMessageItem
                                        key={message.id}
                                        message={message}
                                        isUser={message.sender === 'user'}
                                        avatarUrl={selectedUser.avatar}
                                    />
                                ))}
                                <div ref={bottomRef} />
                            </div>
                        </div>
                        <SpectatorChatInput onSendMessage={handleSendMessage} />
                    </div>
                </div>
            )}
        </>
    );
}
