import {
    BsEmojiAngry,
    BsEmojiFrown,
    BsEmojiGrin,
    BsEmojiNeutral,
    BsEmojiSmile,
} from 'react-icons/bs';
import { Button } from '../ui/button';
import Image from 'next/image';
import UtilityCard from './UtilityCard';
import { useReviewContext } from '@/context/ReviewContext';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';

export default function ReviewInputBoxRight() {
    const { session } = useUserSessionStore();
    const { reviewMessage, setReviewMessage, rating, setRating, submitReviewHandler } =
        useReviewContext();

    const getEmojiColor = (emojiRating: number) => {
        if (rating !== emojiRating) return 'text-white/30';
        switch (emojiRating) {
            case 1:
                return 'text-red-500/60';
            case 2:
                return 'text-orange-400/60';
            case 3:
                return 'text-yellow-300/60';
            case 4:
                return 'text-lime-400/60';
            case 5:
                return 'text-green-400/60';
            default:
                return 'text-white/30';
        }
    };

    return (
        <div className="flex items-center justify-center">
            <UtilityCard className="w-full max-w-lg rounded-3xl p-6 dark:bg-white/2 dark:backdrop-blur-3xl border text-neutral-200">
                <div className="flex items-center gap-4 mb-6 ">
                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="User Avatar"
                            width={48}
                            height={48}
                            className="rounded-full border"
                        />
                    )}
                    <span className={`text-[22px] font-sans text-neutral-200 `}>
                        Hey, <span>{session?.user?.name?.split(' ')[0]}</span>
                    </span>
                </div>

                <div className="mb-6">
                    <textarea
                        placeholder="Drop a review..."
                        value={reviewMessage}
                        onChange={(e) => setReviewMessage(e.target.value)}
                        className="w-full h-28 text-area resize-none bg-transparent text-white rounded-xl placeholder-white/40 p-3 border focus:outline-none focus:ring-1 custom-scrollbar focus:ring-white/20"
                    />
                </div>

                <div className="flex items-center justify-between pl-0.5">
                    <div className="flex space-x-3">
                        <BsEmojiAngry
                            size={26}
                            onClick={() => setRating(1)}
                            className={`cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out ${getEmojiColor(1)}`}
                        />
                        <BsEmojiFrown
                            size={26}
                            onClick={() => setRating(2)}
                            className={`cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out ${getEmojiColor(2)}`}
                        />
                        <BsEmojiNeutral
                            size={26}
                            onClick={() => setRating(3)}
                            className={`cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out ${getEmojiColor(3)}`}
                        />
                        <BsEmojiSmile
                            size={26}
                            onClick={() => setRating(4)}
                            className={`cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out ${getEmojiColor(4)}`}
                        />
                        <BsEmojiGrin
                            size={26}
                            onClick={() => setRating(5)}
                            className={`cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out ${getEmojiColor(5)}`}
                        />
                    </div>
                    <Button
                        variant={'outline'}
                        className="rounded-xl hover:-translate-y-0.5"
                        onClick={submitReviewHandler}
                    >
                        Submit
                    </Button>
                </div>
            </UtilityCard>
        </div>
    );
}
