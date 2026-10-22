import { useWatchlist } from '../context/WatchlistContext';
import { useMovieDetails } from '../hooks/useMovieDetails';
import AppHeader from '../components/AppHeader';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';
import './Home.css';

function MyList() {
  const { watchlist, isInWatchlist, toggleWatchlist } = useWatchlist();
  const { selectedId, setSelectedId, movie, loading, error } = useMovieDetails();

  const movies = watchlist.map((item) => ({
    id: item.movieId,
    title: item.title,
    poster_path: item.posterPath,
  }));

  return (
    <div className="home">
      <AppHeader />

      {movies.length === 0 ? (
        <p className="home-status">
          Sua lista está vazia. Adicione títulos pelo botão "+" nos cards do catálogo.
        </p>
      ) : (
        <MovieRow
          title="Minha Lista"
          movies={movies}
          onSelect={setSelectedId}
          isFavorite={isInWatchlist}
          onToggleFavorite={toggleWatchlist}
        />
      )}

      {selectedId && (
        <MovieModal movie={movie} loading={loading} error={error} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}

export default MyList;
