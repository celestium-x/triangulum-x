'use client';
import WaitingLobbyAvatars from '../common/WaitingLobbyAvatars';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';

import Image from 'next/image';
import LiveQuizInteractionTicker from '../common/LiveQuizInteractionTicker';

export const participants = [
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-1.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-2.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-3.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-4.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-5.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-6.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-7.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-8.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-9.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-10.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-1.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-2.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-3.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-4.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-5.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-6.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-7.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-8.jpg' },
    { avatar: 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-9.jpg' },
];

export default function WaitingLobbyHostLeft() {
    const { quiz } = useLiveQuizStore();
    return (
        <div className="w-full max-h-full flex flex-col relative">
            <WaitingLobbyAvatars />
            <h1 className="absolute left-1/2 -translate-x-1/2 top-20 text-3xl font-normal w-full text-center">
                {quiz?.title}
            </h1>
            <div className="absolute bottom-6 left-6 flex items-center gap-x-2 px-5 py-3 z-[20] bg-light-base dark:bg-dark-base rounded-full">
                <span className="text-dark-primary dark:text-light-base ml-3">
                    Ready to begin ?
                </span>
                <div className="flex -space-x-2">
                    {participants.slice(0, 3).map((participant, idx) => (
                        <div
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                        >
                            <Image
                                src={participant.avatar}
                                alt={'rishi'}
                                width={32}
                                height={32}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                    {participants.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                            +{participants.length - 3}
                        </div>
                    )}
                </div>
            </div>
            <LiveQuizInteractionTicker className="absolute bottom-6 right-6" />
        </div>
    );
}
