import { useEffect, useState } from "react";
import { getGeneros, createGenero } from "../controllers/generoController";
import { Genero } from "../models/Genero";
import { useNavigate } from "react-router-dom";
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
    <div>
      <button
        onClick={() => {
          signOut(auth);
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
      <h2>Géneros musicales</h2>
      <div>
        {generos.map((g) => (
          <div key={g.id}>
            <img src={g.imagen} width={100} />
            <p>{g.nombre}</p>
          </div>
        ))}
      </div>

      {currentUser?.role === "admin" && (
        <form onSubmit={handleSubmit}>
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
