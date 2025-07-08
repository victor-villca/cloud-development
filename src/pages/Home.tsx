import { useEffect, useState } from "react";
import { getGeneros, createGenero } from "../controllers/generoController";
import { Genero } from "../models/Genero";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchGeneros = async () => {
    const data = await getGeneros();
    setGeneros(data as Genero[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoNombre && nuevaImagen) {
      await createGenero(nuevoNombre, nuevaImagen);
      setNuevoNombre("");
      setNuevaImagen(null);
      fetchGeneros();
    }
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={() => {
          signOut(auth);
          navigate("/login");
        }}
      >
        Cerrar Sesion
      </button>
      <div style={{ fontSize: "2rem" }}>{currentUser?.role}</div>
      <h1 style={{ color: "#1DB954" }}>Géneros musicales</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {generos.map((g) => (
          <Link
            to={`/genero/${g.id}`}
            key={g.id}
            style={{
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              padding: "1rem",
              width: "180px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <img
              src={g.imagen}
              alt={g.nombre}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p style={{ marginTop: "0.5rem" }}>{g.nombre}</p>
          </Link>
        ))}
      </div>
      {currentUser?.role === "artista" && (
        <div style={{ marginTop: "2rem" }}>
          <Link to="/subir">
            <button>Subir nueva canción</button>
          </Link>
        </div>
      )}

      {currentUser?.role === "admin" && (
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <h3>Crear género</h3>
          <input
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Nombre del género"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNuevaImagen(e.target.files?.[0] || null)}
            required
          />
          <button type="submit">Crear</button>
        </form>
      )}
    </div>
  );
};

export default Home;
