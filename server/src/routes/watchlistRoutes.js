import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from '../controllers/watchlistController.js';

const router = Router();

router.use(authGuard);
router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/:movieId', removeFromWatchlist);

export default router;
