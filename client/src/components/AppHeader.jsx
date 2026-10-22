import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="home-header">
      <div className="home-header-left">
        <Link to="/" className="home-brand">
          Mini Netflix Clone
        </Link>
        <nav className="home-nav">
          <Link to="/">Catálogo</Link>
          <Link to="/minha-lista">Minha Lista</Link>
        </nav>
      </div>
      <div className="home-user">
        <span>Olá, {user?.name}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </header>
  );
}

export default AppHeader;
