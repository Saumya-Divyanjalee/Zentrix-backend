import { Router } from 'express';
import { register, login, getProfile, updateProfile, uploadAvatar } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';
import { registerValidation, loginValidation } from '../validators/auth.validator';
import { upload } from '../middleware/upload.middleware';


const router = Router();
router.post('/register', registerValidation, register);
router.post('/login',    loginValidation,    login);
router.get('/profile',   protect,            getProfile);
router.put('/profile',   protect,            updateProfile);
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);
export default router;