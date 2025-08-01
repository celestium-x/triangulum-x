"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message, User } from "./specTypes";
import { AnimatePresence } from "framer-motion";
import SpectatorChatToggleButton from "./chat/SpectatorChatToggleButton";
import SpectatorsDisplay from "./chat/SpectatorsDisplay";
import SpectatorChatHeader from "./chat/SpectatorChatHeader";
import SpectatorMessageItem from "./chat/SpectatorMessageItem";
import SpectatorChatInput from "./chat/SpectatorChatInput";
import SpectatorButton from "./chat/SpectatorButton";
import UtilityCard from "../utility/UtilityCard";
import { FaGlobeAmericas } from "react-icons/fa";


const roomUsers: User[] = [
    {
        id: "global",
        name: "Global Chat",
        isOnline: true,
        svg: <FaGlobeAmericas
            className="text-neutral-200"
            style={{ width: '28px', height: '28px' }}
        />,
    },
    {
        id: "2",
        name: "Alex",
        isOnline: true,
        avatar: "https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-1.jpg",
    },
    {
        id: "3",
        name: "Maya",
        isOnline: true,
        avatar: "https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-2.jpg",
    },
    {
        id: "4",
        name: "Raj",
        isOnline: true,
        avatar: "https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-3.jpg",
    },
    {
        id: "5",
        name: "Lena",
        isOnline: true,
        avatar: "https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-4.jpg",
    }
];

export default function SpectatorActions() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [openChatDropdown, setOpenChatDropdown] = useState<boolean>(false);
    const [openPeopleDropdown, setOpenPeopleDropdown] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User>(roomUsers[0]!);

    const newMessage = messages[selectedUser.id];

    useEffect(() => {

        bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    }, [newMessage]);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => ({
            ...prev,
            [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
        }));

        setTimeout(() => {
            const responses = [
                "Kaise ho g!",
                "Mai bhi badiya!",
                "Kuch nahi timepass",
                "This chat is so fun!",
                "Keep the good vibes coming!",
            ];

            const response: Message = {
                id: (Date.now() + 1).toString(),
                text: responses[Math.floor(Math.random() * responses.length)],
                sender: "other",
                timestamp: new Date(),
            };

            setMessages((prev) => ({
                ...prev,
                [selectedUser.id]: [...(prev[selectedUser.id] || []), response],
            }));
        }, 1000 + Math.random() * 2000);
    };

    return (
        <>
            <div className="gap-x-5">
                <SpectatorChatToggleButton onClick={() => {
                    setOpenPeopleDropdown(false)
                    setOpenChatDropdown(prev => !prev)
                }} />

                <SpectatorButton onClick={() => {
                    setOpenChatDropdown(false)
                    setOpenPeopleDropdown(prev => !prev)
                }} />
            </div>

            {openPeopleDropdown && (
                <SpectatorsDisplay
                    users={roomUsers}
                    onSelectUser={(user) => {
                        setSelectedUser(user);
                        setOpenChatDropdown(prev => !prev);
                        setOpenPeopleDropdown(false);
                    }}
                />
            )}
            <AnimatePresence>
                {openChatDropdown && (
                    <UtilityCard
                        key="chatbox"
                        className="fixed bottom-20 p-0 right-12 w-full max-w-md h-[45rem] z-40 rounded-3xl dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700"
                    >

                        <div className="relative h-full flex flex-col">
                            <SpectatorChatHeader user={selectedUser} />
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

                    </UtilityCard>
                )}
            </AnimatePresence>
        </>
    );
}
