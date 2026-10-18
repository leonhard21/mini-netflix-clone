import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTrending, getGenres, getMovieDetails } from '../api/catalog';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';
import './Home.css';

function Home() {
  const { user, logout } = useAuth();
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

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
    if (!selectedId) return;

    setModalLoading(true);
    setModalError('');
    setSelectedMovie(null);

    getMovieDetails(selectedId)
      .then((res) => setSelectedMovie(res.data))
      .catch(() => setModalError('Não foi possível carregar os detalhes do título.'))
      .finally(() => setModalLoading(false));
  }, [selectedId]);

  const genreRows = genres
    .map((genre) => ({
      genre,
      movies: trending.filter((movie) => movie.genre_ids?.includes(genre.id)),
    }))
    .filter((row) => row.movies.length > 0);

  return (
    <div className="home">
      <header className="home-header">
        <span className="home-brand">Mini Netflix Clone</span>
        <div className="home-user">
          <span>Olá, {user?.name}</span>
          <button onClick={logout}>Sair</button>
        </div>
      </header>

      {loading && <p className="home-status">Carregando catálogo...</p>}
      {error && <p className="home-status">{error}</p>}

      {!loading && !error && (
        <>
          <Hero movie={trending[0]} />
          <MovieRow title="Em alta" movies={trending} onSelect={setSelectedId} />
          {genreRows.map(({ genre, movies }) => (
            <MovieRow key={genre.id} title={genre.name} movies={movies} onSelect={setSelectedId} />
          ))}
        </>
      )}

      {selectedId && (
        <MovieModal
          movie={selectedMovie}
          loading={modalLoading}
          error={modalError}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default Home;
