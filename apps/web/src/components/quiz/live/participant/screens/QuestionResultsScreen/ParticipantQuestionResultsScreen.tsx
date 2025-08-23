import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';

export default function ParticipantQuestionResultsScreen() {
    const { participants } = useLiveParticipantsStore();

    return (
        <div className="flex flex-col gap-y-3 p-3">
            {participants.map((p, index) => {
                return (
                    <div className="bg-red-400 text-3xl p-3" key={index}>
                        id is {p.id} : total score: {p.totalScore}
                    </div>
                );
            })}
        </div>
    );
}
