const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

function Hero({ movie }) {
  if (!movie) return null;

  const background = movie.backdrop_path
    ? `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.15) 60%), url(${BACKDROP_BASE}${movie.backdrop_path})`
    : undefined;

  return (
    <section className="hero" style={{ backgroundImage: background }}>
      <div className="hero-content">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </section>
  );
}

export default Hero;
