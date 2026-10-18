const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} loading="lazy" />
      ) : (
        <div className="movie-card-placeholder">{movie.title}</div>
      )}
    </div>
  );
}

export default MovieCard;
