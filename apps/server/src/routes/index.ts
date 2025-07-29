import { Router } from 'express';
import signInController from '../controllers/user-controller/signInController';
import authMiddleware from '../middlewares/authMiddleware';
import getPreSignedUrlController from '../controllers/s3-controller/getPreSignedUrlController';
import upsertQuizController from '../controllers/quiz-controller/upsertQuizController';
import getQuizController from '../controllers/quiz-controller/getQuizController';
import getAllQuizController from '../controllers/quiz-controller/getAllQuizController';
import publishQuizController from '../controllers/quiz-controller/publishQuizController';
import verifyQuizOwnershipMiddleware from '../middlewares/verifyQuizOwnershipMiddleware';
import launchQuizController from '../controllers/quiz-controller/launchQuizController';
import reviewAppController from '../controllers/appReview-controller/reviewAppController';

const router = Router();

router.post('/sign-in', signInController);

//quiz-routes
router.post('/quiz/create-quiz/:quizId', authMiddleware, upsertQuizController);
router.get('/quiz/get-quiz/:quizId', authMiddleware, getQuizController);
router.get('/quiz/get-all-quiz', authMiddleware, getAllQuizController);
router.post('/get-presigned-url', getPreSignedUrlController);
router.put(
    '/quiz/publish-quiz/:quizId',
    authMiddleware,
    verifyQuizOwnershipMiddleware,
    publishQuizController,
);
router.get(
    '/quiz/launch-quiz/:quizId',
    authMiddleware,
    verifyQuizOwnershipMiddleware,
    launchQuizController,
);

router.post('review', authMiddleware, reviewAppController);

export default router;
