import { Router } from 'express';
import { getTrending, getGenres, search, getMovieDetails } from '../controllers/catalogController.js';

const router = Router();

router.get('/trending', getTrending);
router.get('/genres', getGenres);
router.get('/search', search);
router.get('/movies/:id', getMovieDetails);

export default router;
