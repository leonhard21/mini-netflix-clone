const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

function MovieCard({ movie, onSelect, isFavorite, onToggleFavorite }) {
  return (
    <div className="movie-card">
      <button className="movie-card-poster" onClick={() => onSelect(movie.id)}>
        {movie.poster_path ? (
          <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} loading="lazy" />
        ) : (
          <div className="movie-card-placeholder">{movie.title}</div>
        )}
      </button>
      <button
        className={`movie-card-favorite${isFavorite ? ' is-active' : ''}`}
        onClick={() => onToggleFavorite(movie)}
        aria-label={isFavorite ? 'Remover da minha lista' : 'Adicionar à minha lista'}
        aria-pressed={isFavorite}
      >
        {isFavorite ? '✓' : '+'}
      </button>
    </div>
  );
}

export default MovieCard;
