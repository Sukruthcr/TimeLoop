import { Router } from 'express';
import { createLetter, getPublicLetters } from '../controllers/letterController';

const router = Router();

router.post('/', createLetter);
router.get('/public', getPublicLetters);

export default router; 