import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.ts";

const router = Router();

router.post('/sign-in', authMiddleware);
export default router;