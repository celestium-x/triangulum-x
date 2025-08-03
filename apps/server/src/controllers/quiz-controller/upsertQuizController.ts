import { Request, Response } from 'express';
import { createQuizSchema } from '../../schemas/createQuizSchema';
import { quizControllerInstance } from '../../services/init-services';
import { QUIZ_STATUS } from './quizController';

export default async function upsertQuizController(req: Request, res: Response) {
    const { quizId } = req.params;
    if (!quizId) {
        res.status(400).json({
            success: false,
            message: 'Invalid quizId',
            value: 'INVALID_QUIZID',
        });
        return;
    }

    const parsed = createQuizSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            success: false,
            message: 'Error while creating quiz',
            value: 'INVALID_QUIZ_FORMAT',
        });
        return;
    }

    const input = parsed.data;
    const hostId = req.user?.id;
    const questions = input.questions;

    if (!hostId) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
            value: 'UNAUTHORIZED',
        });
        return;
    }

    try {
        const data = await quizControllerInstance.update_quiz_status(
            QUIZ_STATUS.SAVE_NEW_QUIZ,
            quizId,
            input,
            questions,
            hostId,
        );

        if (!data || !data.success || data.error || !data.quiz) {
            console.error('[CREATE_QUIZ_ERROR] ', data?.error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                value: 'INTERNAL_SERVER_ERROR',
            });
            return;
        }

        res.status(201).json({
            success: true,
            quiz: data.quiz,
            message: 'Quiz created successfully',
            value: 'QUIZ_CREATED',
        });
        return;
    } catch (err) {
        console.error('[CREATE_QUIZ_ERROR] ', err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            value: 'INTERNAL_SERVER_ERROR',
        });
        return;
    }
}
