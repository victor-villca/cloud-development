import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getGeneros } from "../controllers/generoController";

import { Genero } from "../models/Genero";
import { subirCancion } from "../controllers/songController";

const UploadSongForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [nombre, setNombre] = useState("");
  const [audio, setAudio] = useState<File | null>(null);
  const [generoId, setGeneroId] = useState("");

  useEffect(() => {
    getGeneros().then(setGeneros);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !audio) return;

    await subirCancion(nombre, audio, currentUser.id, generoId);
    alert("Canción subida!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Subir canción</h2>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre canción"
        required
      />
      <select
        value={generoId}
        onChange={(e) => setGeneroId(e.target.value)}
        required
      >
        <option value="">Selecciona un género</option>
        {generos.map((g) => (
          <option key={g.id} value={g.id}>
            {g.nombre}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => setAudio(e.target.files?.[0] || null)}
        required
      />
      <button>Subir</button>
    </form>
  );
};

export default UploadSongForm;
