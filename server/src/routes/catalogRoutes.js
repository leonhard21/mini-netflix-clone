import { Router } from 'express';
import { getTrending, getGenres, search } from '../controllers/catalogController.js';

const router = Router();

router.get('/trending', getTrending);
router.get('/genres', getGenres);
router.get('/search', search);

export default router;
