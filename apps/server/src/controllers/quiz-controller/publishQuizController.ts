import prisma from '@repo/db/client';
import { Request, Response } from 'express';
import { createQuizSchema } from '../../schemas/createQuizSchema';
import { quizControllerInstance } from '../../services/init-services';
import { QUIZ_STATUS } from './quizController';

export default async function publishQuizController(req: Request, res: Response) {
    const userId = req.user?.id;
    const quizId = req.params.quizId;

    if (!userId) {
        res.status(401).json({
            success: false,
            message: 'User authentication required',
        });
        return;
    }
    if (!quizId) {
        res.status(400).json({
            success: false,
            message: 'Quiz ID is required',
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
    const questions = input.questions;

    const data = await quizControllerInstance.update_quiz_status(QUIZ_STATUS.PUBLISH_QUIZ, quizId, input, questions, userId);

    if (!data || data.error || !data.quiz) {
        console.error('Error publishing quiz:', data?.error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
        return;
    }

    const quiz = data.quiz;
    let prev_status;

    if(data.type === QUIZ_STATUS.PUBLISH_QUIZ) {
        prev_status = data.status;
    }

    if (prev_status === 'PUBLISHED') {
        res.status(400).json({
            success: false,
            message: 'Quiz is already published',
        });
        return;
    }

    if (quiz.status === 'LIVE') {
        res.status(400).json({
            success: false,
            message: 'Quiz is live',
        });
        return;
    }

    try {
        res.status(200).json({
            success: true,
            message: 'Quiz published successfully',
        });
        return;
    } catch (err) {
        console.error('Error publishing quiz:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
