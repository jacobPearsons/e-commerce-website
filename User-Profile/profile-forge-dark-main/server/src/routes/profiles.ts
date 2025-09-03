import express from 'express';
import { getProfile, updateProfile, getSkills, addSkill } from '../controllers/profileController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);
router.get('/skills', auth, getSkills);
router.post('/skills', auth, addSkill);

export default router;