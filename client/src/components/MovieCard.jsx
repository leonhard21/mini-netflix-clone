const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

function MovieCard({ movie, onSelect }) {
  return (
    <button className="movie-card" onClick={() => onSelect(movie.id)}>
      {movie.poster_path ? (
        <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} loading="lazy" />
      ) : (
        <div className="movie-card-placeholder">{movie.title}</div>
      )}
    </button>
  );
}

export default MovieCard;
