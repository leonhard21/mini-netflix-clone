import api from './client';

export function getTrending() {
  return api.get('/api/catalog/trending');
}

export function getGenres() {
  return api.get('/api/catalog/genres');
}

export function getMovieDetails(id) {
  return api.get(`/api/catalog/movies/${id}`);
}
