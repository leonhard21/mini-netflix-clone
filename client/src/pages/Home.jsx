import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getTrending, getGenres, searchMovies } from '../api/catalog';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useMovieDetails } from '../hooks/useMovieDetails';
import AppHeader from '../components/AppHeader';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';
import './Home.css';

function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const { user } = useAuth();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { selectedId, setSelectedId, movie, loading: modalLoading, error: modalError } = useMovieDetails();

  function handleToggleFavorite(movie) {
    if (!user) {
      navigate('/login');
      return;
    }
    toggleWatchlist(movie);
  }

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

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    setSearchError('');

    searchMovies(query)
      .then((res) => setSearchResults(res.data.results || []))
      .catch(() => setSearchError('Não foi possível buscar agora.'))
      .finally(() => setSearchLoading(false));
  }, [query]);

  const genreRows = genres
    .map((genre) => ({
      genre,
      movies: trending.filter((movie) => movie.genre_ids?.includes(genre.id)),
    }))
    .filter((row) => row.movies.length > 0);

  return (
    <div className="home">
      <AppHeader />

      {query ? (
        <div className="search-results">
          {searchLoading && <p className="home-status">Buscando...</p>}
          {searchError && <p className="home-status">{searchError}</p>}
          {!searchLoading && !searchError && searchResults.length === 0 && (
            <p className="home-status">Nenhum resultado para "{query}".</p>
          )}
          {!searchLoading && !searchError && searchResults.length > 0 && (
            <MovieRow
              title={`Resultados para "${query}"`}
              movies={searchResults}
              onSelect={setSelectedId}
              isFavorite={isInWatchlist}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>
      ) : (
        <>
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
                onToggleFavorite={handleToggleFavorite}
              />
              {genreRows.map(({ genre, movies }) => (
                <MovieRow
                  key={genre.id}
                  title={genre.name}
                  movies={movies}
                  onSelect={setSelectedId}
                  isFavorite={isInWatchlist}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </>
          )}
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
