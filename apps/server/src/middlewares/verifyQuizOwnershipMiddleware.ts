import prisma from "@repo/db/client";
import { NextFunction, Request, Response } from "express";

export default async function verifyQuizOwnership(req: Request, res: Response, next: NextFunction) {
    const quizId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized user" });
        return;
    }

    if (!quizId) {
        res.status(400).json({ success: false, message: "Quiz id is required" });
        return;
    }

    try {
        const quiz = await prisma.quiz.findFirst({
            where: {
                id: quizId,
                hostId: String(userId),
            }
        })

        if (!quiz) {
            res.status(403).json({ success: false, message: "You have not permission to delete this quiz" });
            return;
        }

        next();

    } catch (error) {
        res.status(500).json({ message: "Error deleting quiz" });
        return;
    }
}