import { Router } from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/note.controller';
import { protect } from '../middleware/auth.middleware';
import { createNoteValidation } from '../validators/note.validator';


const router = Router();
router.use(protect);
router.get('/',     getNotes);
router.post('/',    createNoteValidation, createNote);
router.get('/:id',  getNoteById);
router.put('/:id',  updateNote);
router.delete('/:id', deleteNote);
export default router;
