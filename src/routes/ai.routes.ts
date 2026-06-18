import { Router } from 'express';
import { summarize, quiz, studyPlan, getHistory } from '../controllers/ai.controller';
import { protect } from '../middleware/auth.middleware';



const router = Router();
router.use(protect);
router.post('/summarize',   summarize);
router.get('/history', getHistory);
router.post('/quiz',        quiz);
router.post('/study-plan',  studyPlan);
export default router;
