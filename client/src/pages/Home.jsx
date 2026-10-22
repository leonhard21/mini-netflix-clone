import { useEffect, useState } from 'react';
import { getTrending, getGenres } from '../api/catalog';
import { useWatchlist } from '../context/WatchlistContext';
import { useMovieDetails } from '../hooks/useMovieDetails';
import AppHeader from '../components/AppHeader';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';
import './Home.css';

function Home() {
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { selectedId, setSelectedId, movie, loading: modalLoading, error: modalError } = useMovieDetails();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const [trendingRes, genresRes] = await Promise.all([getTrending(), getGenres()]);
        setTrending(trendingRes.data.results || []);
        setGenres(genresRes.data.genres || []);
      } catch (err) {
        setError('Não foi possível carregar o catálogo agora.');
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, []);

  const genreRows = genres
    .map((genre) => ({
      genre,
      movies: trending.filter((movie) => movie.genre_ids?.includes(genre.id)),
    }))
    .filter((row) => row.movies.length > 0);

  return (
    <div className="home">
      <AppHeader />

      {loading && <p className="home-status">Carregando catálogo...</p>}
      {error && <p className="home-status">{error}</p>}

      {!loading && !error && (
        <>
          <Hero movie={trending[0]} />
          <MovieRow
            title="Em alta"
            movies={trending}
            onSelect={setSelectedId}
            isFavorite={isInWatchlist}
            onToggleFavorite={toggleWatchlist}
          />
          {genreRows.map(({ genre, movies }) => (
            <MovieRow
              key={genre.id}
              title={genre.name}
              movies={movies}
              onSelect={setSelectedId}
              isFavorite={isInWatchlist}
              onToggleFavorite={toggleWatchlist}
            />
          ))}
        </>
      )}

      {selectedId && (
        <MovieModal
          movie={movie}
          loading={modalLoading}
          error={modalError}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default Home;
