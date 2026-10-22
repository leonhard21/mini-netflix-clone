import api from './client';

export function getWatchlist() {
  return api.get('/api/watchlist');
}

export function addToWatchlist(movie) {
  return api.post('/api/watchlist', movie);
}

export function removeFromWatchlist(movieId) {
  return api.delete(`/api/watchlist/${movieId}`);
}
