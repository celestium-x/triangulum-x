import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getQuizController(req: Request, res: Response) {
    const quizId = req.params.quizId;
    const userId = req.user?.id;

    if (!quizId) {
        res.status(400).json({ success: false, message: "Invalid quiz-id" });
        return;
    }
    if (!userId) {
        res.status(400).json({ success: false, message: "Invalid user" });
        return;
    }

    try {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId
            },
            include: {
                questions: true
            }
        });

        if (!quiz) {
            res.status(201).json({ success: true, message: "Quiz not found", value: "QUIZ_NOT_EXIST" });
            return;
        } else {
            if (quiz.hostId !== String(userId)) {
                res.status(201).json({ success: false, message: "You are not authorized", value: "NOT_AUTHORIZED" });
                return;
            } else {
                res.status(201).json({ success: true, quiz, message: "Quiz found", value: "QUIZ_FOUND" });
                return;
            }
        }


    } catch (error) {
        console.error("GET_QUIZ_ERROR", error);
        res.status(500).json({ success: true, message: "Internal server error" });
        return;
    }
}