import { Router } from "express";
<<<<<<< HEAD
import authMiddleware from "../middlewares/authMiddleware.ts";
import { prisma } from "@repo/database"
=======
import signInController from "../controllers/user-controller/signInController";
>>>>>>> acc651c (signin-feature)

const router = Router();

router.post('/sign-in', signInController);
export default router;