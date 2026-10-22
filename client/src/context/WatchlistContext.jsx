import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../api/watchlist';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    getWatchlist()
      .then((res) => setWatchlist(res.data))
      .catch(() => {});
  }, [user]);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((item) => item.movieId === movieId),
    [watchlist]
  );

  async function toggleWatchlist(movie) {
    if (isInWatchlist(movie.id)) {
      const res = await removeFromWatchlist(movie.id);
      setWatchlist(res.data);
    } else {
      const res = await addToWatchlist({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      });
      setWatchlist(res.data);
    }
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, isInWatchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
