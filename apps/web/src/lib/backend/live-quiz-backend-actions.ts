import axios from 'axios';
import { GET_SELECTED_QUESTION_DATA } from 'routes/api_routes';

export default class LiveQuizBackendActions {
    static async getQuestionDetailByIndex(quizId: string, questionIndex: number, token: string) {
        if (!quizId || questionIndex == null || questionIndex < 0 || !token) {
            console.error('Invalid parameters for getQuestionDetailByIndex');
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
            } else {
                console.error('Backend returned unsuccessful response:', data.message);
                return null;
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                console.warn(`Question at index ${questionIndex} not found`);
            } else {
                console.error('Failed to fetch question data', err.response?.data || err.message);
            }
            return null;
        }
    }
}