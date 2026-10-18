import tmdb from '../config/tmdb.js';
import { getFromCache, setCache } from '../utils/cache.js';

export async function getTrending(req, res) {
  const cacheKey = 'trending';
  const cached = getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const { data } = await tmdb.get('/trending/movie/week');
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(502).json({ message: 'Não foi possível buscar os destaques no momento.' });
  }
}

export async function getGenres(req, res) {
  const cacheKey = 'genres';
  const cached = getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const { data } = await tmdb.get('/genre/movie/list');
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(502).json({ message: 'Não foi possível buscar os gêneros no momento.' });
  }
}

export async function search(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Informe um termo de busca.' });
  }

  const cacheKey = `search:${query}`;
  const cached = getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const { data } = await tmdb.get('/search/movie', { params: { query } });
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(502).json({ message: 'Não foi possível realizar a busca no momento.' });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  const cacheKey = `movie:${id}`;
  const cached = getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const { data } = await tmdb.get(`/movie/${id}`, {
      params: { append_to_response: 'videos,credits' },
    });
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(502).json({ message: 'Não foi possível carregar os detalhes do título.' });
  }
}
