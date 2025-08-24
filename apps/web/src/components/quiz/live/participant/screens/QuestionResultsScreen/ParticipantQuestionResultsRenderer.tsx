import { cn } from '@/lib/utils';
import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';

export default function ParticipantQuestionResultsRenderer() {
    const { participants } = useLiveParticipantsStore();

    const sortedParticipants = [...participants].sort((p1, p2) => p2.totalScore - p1.totalScore);

    // const getRelativeHeight = (rank: number) => {

    // }

    return (
        <div
            className={cn(
                'w-full h-full overflow-hidden flex flex-col items-center justify-center ',
                'relative',
            )}
        >
            {sortedParticipants.map((_p, index) => {
                // const attributes = getAttributes(index + 1);

                return <div
                    className=""
                    key={index}
                ></div>;
            })}
        </div>
    );
}

// interface attributes {
//     height: number;
//     color: string;

// }

// function getAttributes(rank: number) {
//     if (rank === 1) {
//         return 500;
//     }
// }

// function getRandomColor(): string {
//     const colors = ['#c9ee80', '#eebbe2', '#adc0ec', '#c9ee80'];

//     return colors[Math.floor(Math.random())] || '#c9ee80';
// }
