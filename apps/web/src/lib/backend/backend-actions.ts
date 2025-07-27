import { QuizType } from '@/types/prisma-types';
import axios from 'axios';
import { CREATE_QUIZ_URL, LAUNCH_QUIZ_URL, PUBLISH_QUIZ_URL } from 'routes/api_routes';

export default class BackendActions {
    static async upsertQuizAction(quiz: QuizType, token: string) {
        if (!token || !quiz.id) {
            return;
        }
        try {
            const { data: _data } = await axios.post(`${CREATE_QUIZ_URL}/${quiz.id}`, quiz, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.error('[UPSERT_QUIZ_ERROR]', err);
        }
    }
    static async publishQuiz(quizId: string, token: string): Promise<boolean> {
        if (!token || !quizId) {
            return false;
        }
        try {
            const { data } = await axios.put(
                `${PUBLISH_QUIZ_URL}/${quizId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (data.success) {
                return true;
            }
            return false;
        } catch (err) {
            console.error('[PUBLISH_QUIZ_ERROR]', err);
            return false;
        }
    }

    static async launchQuiz(quizId: string, token: string): Promise<boolean> {
        if (!token || !quizId) {
            return false;
        }
        try {
            const { data } = await axios.get(`${LAUNCH_QUIZ_URL}/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            if (data.success) {
                return true;
            }
            return false;
        } catch (err) {
            console.error('[LAUNCH_QUIZ_ERROR]', err);
            return false;
        }
    }
}
