import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.ts";
import { prisma } from "@repo/database"

const router = Router();

router.post('/sign-in', authMiddleware);
export default router;