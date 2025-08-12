import { ChatMessageType } from '@/types/web-socket-types';
import { create } from 'zustand';

interface LiveQuizGlobalChatStore {
    chatMessages: ChatMessageType[];
    addChatMessage: (chatMessage: ChatMessageType) => void;
    setChatMessages: (chatMessages: ChatMessageType[]) => void;
}

export const useLiveQuizGlobalChatStore = create<LiveQuizGlobalChatStore>((set, _get) => ({
    chatMessages: [],

    addChatMessage: (chatMessage: ChatMessageType) => {
        set((state) => ({
            chatMessages: [...state.chatMessages, chatMessage],
        }));
    },

    setChatMessages: (chatMessages: ChatMessageType[]) => {
        set((state) => ({
            chatMessages: state.chatMessages.concat(chatMessages),
        }));
    },
}));
