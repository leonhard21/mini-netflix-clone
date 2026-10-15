import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>Mini Netflix Clone</h1>
      <p>Bem-vindo(a), {user?.name}!</p>
      <p>Catálogo e muito mais chegando em breve.</p>
      <button onClick={logout}>Sair</button>
    </main>
  );
}

export default Home;
