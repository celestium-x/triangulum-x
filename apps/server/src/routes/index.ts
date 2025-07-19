import { Router } from "express";
import signInController from "../controllers/user-controller/signInController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/sign-in', signInController);
router.get("/get-quiz",authMiddleware)
export default router;