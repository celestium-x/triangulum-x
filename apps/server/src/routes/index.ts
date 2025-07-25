import { Router } from "express";
import signInController from "../controllers/user-controller/signInController";
import authMiddleware from "../middlewares/authMiddleware";
import getPreSignedUrlController from "../controllers/s3-controller/getPreSignedUrlController";
import upsertQuizController from "../controllers/quiz-controller/upsertQuizController";

const router = Router();

router.post('/sign-in', signInController);

//quiz-routes
router.post("/quiz/create-quiz/:quizId", authMiddleware, upsertQuizController);

router.post("/get-presigned-url", getPreSignedUrlController);
export default router;


// quiz creation -> valid owner
// quiz update -> validowner