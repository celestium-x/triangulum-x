'use client';

import { useHomeRendererStore } from '@/store/home/useHomeRendererStore';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { HomeRendererEnum } from '@/types/homeRendererTypes';
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { CREATE_REVIEW_URL } from 'routes/api_routes';
import { toast } from 'sonner';

interface ReviewContextType {
    reviewMessage: string;
    setReviewMessage: (msg: string) => void;
    rating: number;
    setRating: (rating: number) => void;
    submitReviewHandler: () => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

export const useReviewContext = () => {
    const context = useContext(ReviewContext);
    if (!context) {
        throw new Error('useReviewContext must be used within a ReviewProvider');
    }
    return context;
};

export function ReviewProvider({ children }: { children: React.ReactNode }) {
    const [reviewMessage, setReviewMessage] = useState('');
    const [rating, setRating] = useState(0);
    const { session } = useUserSessionStore();
    const { setValue } = useHomeRendererStore();

    const submitReviewHandler = async () => {
        if (!reviewMessage.trim()) {
            toast.error('Please enter a feedback');
            return;
        }

        try {
            await axios.post(
                CREATE_REVIEW_URL,
                {
                    rating,
                    comment: reviewMessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.user.token}`,
                    },
                },
            );
            toast.success('Review submitted!');
            setReviewMessage('');
            setRating(0);
            setValue(HomeRendererEnum.DASHBOARD);
        } catch (err) {
            console.error('error', err);
            toast.error('Failed to submit review');
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                reviewMessage,
                setReviewMessage,
                rating,
                setRating,
                submitReviewHandler,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
}
