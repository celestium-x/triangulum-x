import axios from 'axios';
import { PARTICIPANT_JOIN_QUIZ_URL, SPECTATOR_JOIN_QUIZ_URL } from 'routes/api_routes';
import { toast } from 'sonner';

class UserQuizAction {
    public async joinQuiz(code: string): Promise<unknown> {
        switch (code.length) {
            case 6:
                return await this.spectatorJoinQuiz(code);
            case 12:
                return await this.participantJoinQuiz(code);
            default:
                toast.error('Please enter a valid code');
                return;
        }
    }

    private async participantJoinQuiz(code: string): Promise<unknown> {
        try {
            if (!code) {
                toast.error('Please enter a code');
                return;
            }
            if (code.length !== 12) {
                toast.error('Please enter a valid code');
                return;
            }

            const { data } = await axios.post(
                PARTICIPANT_JOIN_QUIZ_URL,
                { code },
                { withCredentials: true },
            );

            if (data.success) {
                toast.success(data.message);
                return data.quizId;
            }
            toast.error(data.message);
            return;
        } catch (err) {
            console.error('Error while joining quiz', err);
        }
    }

    private async spectatorJoinQuiz(code: string): Promise<unknown> {
        try {
            if (!code) {
                toast.error('Please enter a code');
                return;
            }
            if (code.length !== 6) {
                toast.error('Please enter a valid code');
                return;
            }

            const { data } = await axios.post(
                SPECTATOR_JOIN_QUIZ_URL,
                { code },
                { withCredentials: true },
            );

            if (data.success) {
                toast.success(data.message);
                return data.quizId;
            }
            toast.error(data.message);
            return;
        } catch (err) {
            console.error('Error while joining quiz', err);
        }
    }
}

const userQuizAction = new UserQuizAction();
export default userQuizAction;
