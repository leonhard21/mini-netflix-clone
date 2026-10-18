import { useEffect, useRef } from 'react';

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

function MovieModal({ movie, loading, error, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const trailer = movie?.videos?.results?.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );
  const cast = movie?.credits?.cast?.slice(0, 5).map((member) => member.name).join(', ');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        {loading && <p className="modal-status">Carregando detalhes...</p>}
        {error && <p className="modal-status">{error}</p>}

        {movie && !loading && !error && (
          <>
            {movie.backdrop_path && (
              <img
                className="modal-backdrop"
                src={`${BACKDROP_BASE}${movie.backdrop_path}`}
                alt=""
              />
            )}

            <div className="modal-body">
              <h2 id="modal-title">{movie.title}</h2>

              {trailer ? (
                <div className="modal-trailer">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`Trailer de ${movie.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="modal-status">Trailer não disponível.</p>
              )}

              <p>{movie.overview}</p>

              {movie.genres?.length > 0 && (
                <p className="modal-meta">
                  <strong>Gêneros:</strong> {movie.genres.map((genre) => genre.name).join(', ')}
                </p>
              )}

              {cast && (
                <p className="modal-meta">
                  <strong>Elenco:</strong> {cast}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
