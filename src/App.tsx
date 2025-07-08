import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { JSX, useContext } from "react";
import UploadSongForm from "./pages/NewSongForm";
import ArtistsList from "./pages/ArtistsList";
import SongsList from "./pages/SongsList";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, loading } = useContext(AuthContext);
  if (loading) return <p>Cargando...</p>;
  return currentUser ? children : <Navigate to="/login" />;
};

const ArtistRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, loading } = useContext(AuthContext);
  if (loading) return <p>Cargando...</p>;
  if (!currentUser) return <Navigate to="/login" />;
  return currentUser.role === "artista" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/subir"
            element={
              <ArtistRoute>
                <UploadSongForm />
              </ArtistRoute>
            }
          />

          <Route
            path="/genero/:generoId"
            element={
              <PrivateRoute>
                <ArtistsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/artista/:artistaId"
            element={
              <PrivateRoute>
                <SongsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
