import axios from 'axios';
import { PARTICIPANT_JOIN_QUIZ_URL } from 'routes/api_routes';
import { toast } from 'sonner';

export default class ParticipantQuizAction {
    public static async joinQuiz(code: string): Promise<void> {
        try {
            if (!code) {
                toast.error('Please enter a code');
                return;
            };
            if (code.length !== 6 && code.length !== 12) {
                toast.error('Please enter a valid code');
                return;
            }

            const { data } = await axios.post(
                PARTICIPANT_JOIN_QUIZ_URL,
                { code },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success(data.message);
                return;
            }
            toast.error(data.message);
            return;
        } catch (err) {
            console.error('Error while joining quiz', err);
        }
    }
}
