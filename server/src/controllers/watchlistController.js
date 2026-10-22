import User from '../models/User.js';

export async function getWatchlist(req, res) {
  const user = await User.findById(req.userId).select('watchlist');
  res.json(user.watchlist);
}

export async function addToWatchlist(req, res) {
  const { movieId, title, posterPath } = req.body;

  if (!movieId || !title) {
    return res.status(400).json({ message: 'Informe o filme a adicionar.' });
  }

  const user = await User.findById(req.userId);
  const alreadyExists = user.watchlist.some((item) => item.movieId === movieId);

  if (!alreadyExists) {
    user.watchlist.push({ movieId, title, posterPath });
    await user.save();
  }

  res.status(201).json(user.watchlist);
}

export async function removeFromWatchlist(req, res) {
  const { movieId } = req.params;

  const user = await User.findById(req.userId);
  user.watchlist = user.watchlist.filter((item) => item.movieId !== Number(movieId));
  await user.save();

  res.json(user.watchlist);
}
