import axios from 'axios';
import { GET_SELECTED_QUESTION_DATA } from 'routes/api_routes';

export default class LiveQuizBackendActions {
    static async getQuestionDetailByIndex(quizId: string, questionIndex: number, token: string) {
        if (!quizId || questionIndex === null || !token) {
            return null;
        }

        try {
            const { data } = await axios.get(
                `${GET_SELECTED_QUESTION_DATA}/${quizId}/${questionIndex}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (data.success) {
                return data.question;
            }
        } catch (err) {
            console.error('Failed to fetch question data', err);
            return null;
        }
    }
}
