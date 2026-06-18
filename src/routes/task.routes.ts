import { Router } from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { protect } from '../middleware/auth.middleware';
import { createTaskValidation } from '../validators/task.validator';


const router = Router();
router.use(protect);
router.get('/',     getTasks);
router.post('/',    createTaskValidation, createTask);
router.get('/:id',  getTaskById);
router.put('/:id',  updateTask);
router.delete('/:id', deleteTask);
export default router;
