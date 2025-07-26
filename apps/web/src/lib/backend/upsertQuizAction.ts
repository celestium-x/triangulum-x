import { QuizType } from '@/types/prisma-types';
import axios from 'axios';
import { CREATE_QUIZ_URL } from 'routes/api_routes';

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
}
