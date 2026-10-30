import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debounceRef = useRef(null);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      navigate(value.trim() ? `/?q=${encodeURIComponent(value.trim())}` : '/');
    }, 400);
  }

  return (
    <header className="home-header">
      <div className="home-header-left">
        <Link to="/" className="home-brand">
          Mini Netflix Clone
        </Link>
        <nav className="home-nav">
          <Link to="/">Catálogo</Link>
          {user && <Link to="/minha-lista">Minha Lista</Link>}
        </nav>
      </div>
      <div className="home-header-right">
        <input
          type="search"
          className="search-input"
          placeholder="Buscar títulos..."
          value={query}
          onChange={handleChange}
        />
        {user ? (
          <div className="home-user">
            <span>Olá, {user.name}</span>
            <button onClick={logout}>Sair</button>
          </div>
        ) : (
          <div className="home-user">
            <Link to="/login">Entrar</Link>
            <Link to="/register" className="home-cta">
              Cadastre-se
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
