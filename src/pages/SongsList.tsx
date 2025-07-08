import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCancionesPorArtista } from "../controllers/songController";
import { Cancion } from "../models/Cancion";

const SongsList = () => {
  const { artistaId } = useParams();
  const [canciones, setCanciones] = useState<Cancion[]>([]);

  useEffect(() => {
    if (artistaId) {
      getCancionesPorArtista(artistaId).then(setCanciones);
    }
  }, [artistaId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#1DB954" }}>Canciones del artista</h2>
      <div>
        {canciones.map((c) => (
          <div
            key={c.id}
            style={{
              backgroundColor: "#1E1E1E",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <p>{c.nombre}</p>
            <audio controls src={c.audioUrl} style={{ width: "100%" }}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsList;
