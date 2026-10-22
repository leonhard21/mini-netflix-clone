import { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/catalog';

export function useMovieDetails() {
  const [selectedId, setSelectedId] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedId) return;

    setLoading(true);
    setError('');
    setMovie(null);

    getMovieDetails(selectedId)
      .then((res) => setMovie(res.data))
      .catch(() => setError('Não foi possível carregar os detalhes do título.'))
      .finally(() => setLoading(false));
  }, [selectedId]);

  return { selectedId, setSelectedId, movie, loading, error };
}
