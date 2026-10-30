import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyList from './pages/MyList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/minha-lista"
              element={
                <ProtectedRoute>
                  <MyList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
