import { Router } from "express";
import signInController from "../controllers/user-controller/signInController";
import authMiddleware from "../middlewares/authMiddleware";
import createQuizController from "../controllers/quiz-controller/createQuizController";

const router = Router();

router.post('/sign-in', signInController);

//quiz-routes
router.post("/quiz/create-quiz",authMiddleware,createQuizController);
export default router;