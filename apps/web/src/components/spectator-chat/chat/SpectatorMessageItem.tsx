import React from 'react';
import { Message } from '../specTypes';
import SpectatorSpeechBubble from './SpectatorSpeechBubble';

interface MessageItemProps {
    message: Message;
    isUser: boolean;
    avatarUrl?: string;
}

export default function SpectatorMessageItem({ message, isUser, avatarUrl }: MessageItemProps) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div
                className={`flex items-end space-x-3 overflow-y-auto ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
                <div className="flex flex-col">
                    <SpectatorSpeechBubble
                        direction={isUser ? 'right' : 'left'}
                        time={message.timestamp}
                        avatarUrl={!isUser ? avatarUrl : undefined}
                    >
                        {message.text}
                    </SpectatorSpeechBubble>
                </div>
            </div>
        </div>
    );
}
