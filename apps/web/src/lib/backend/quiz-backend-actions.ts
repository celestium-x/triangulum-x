import { QuizType } from '@/types/prisma-types';
import axios from 'axios';
import { CREATE_QUIZ_URL, LAUNCH_QUIZ_URL, PUBLISH_QUIZ_URL } from 'routes/api_routes';

export default class BackendActions {
    static async upsertQuizAction(quiz: QuizType, token: string): Promise<boolean> {
        if (!token || !quiz.id) {
            return false;
        }
        try {
            const { data } = await axios.post(`${CREATE_QUIZ_URL}/${quiz.id}`, quiz, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                return true;
            }
            return false;
        } catch (err) {
            console.error('[UPSERT_QUIZ_ERROR]', err);
            return false;
        }
    }

    static async publishQuiz(quiz: QuizType, token: string): Promise<boolean> {
        if (!token || !quiz) {
            console.log("something not found: ", token, quiz);
            return false;
        }

        console.log("quiz: ", quiz);

        try {
            const { data } = await axios.post(
                `${PUBLISH_QUIZ_URL}/${quiz.id}`,
                quiz,
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

    static async launchQuiz(quiz: QuizType, token: string): Promise<boolean> {
        if (!token || !quiz) {
            return false;
        }
        try {
            const { data } = await axios.post(
                `${LAUNCH_QUIZ_URL}/${quiz.id}`,
                quiz,
                {
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
