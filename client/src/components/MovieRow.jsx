import MovieCard from './MovieCard';

function MovieRow({ title, movies }) {
  if (!movies.length) return null;

  return (
    <section className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row-track">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
