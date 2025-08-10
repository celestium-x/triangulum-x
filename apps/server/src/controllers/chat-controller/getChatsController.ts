import prisma from '@repo/db/client';
import { Request, Response } from 'express';

export default async function getChatsController(req: Request, res: Response) {
    try {
        const { gameSessionId, quizId } = req.query;

        if (!gameSessionId || !quizId) {
            res.status(400).json({
                message: 'Missing required parameters: gameSessionId and quizId.',
            });
            return;
        }

        const messages = await prisma.chatMessage.findMany({
            where: {
                gameSessionId: gameSessionId as string,
                quizId: quizId as string,
            },
            include: {
                chatReactions: true,
                replies: {
                    include: {
                        chatReactions: true,
                    },
                    orderBy: { createdAt: 'asc' },
                },
                repliedTo: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        res.status(200).json({ messages });
        return;
    } catch (error) {
        console.error('[GET_CHAT_MESSAGES_ERROR]', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}
