import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { User } from "../models/User";

const ArtistsList = () => {
  const { generoId } = useParams();
  const [artistas, setArtistas] = useState<User[]>([]);

  useEffect(() => {
    const fetchArtistasPorGenero = async () => {
      const cancionesQuery = query(
        collection(db, "canciones"),
        where("generoId", "==", generoId),
      );
      const cancionesSnap = await getDocs(cancionesQuery);
      const artistaIds = Array.from(
        new Set(cancionesSnap.docs.map((doc) => doc.data().artistaId)),
      );

      const artistasData: User[] = [];
      for (const id of artistaIds) {
        const artistaDoc = await getDoc(doc(db, "users", id));
        if (artistaDoc.exists()) {
          artistasData.push(artistaDoc.data() as User);
        }
      }

      setArtistas(artistasData);
    };

    fetchArtistasPorGenero();
  }, [generoId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#1DB954" }}>
        Artistas con canciones en este género
      </h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {artistas.map((artista) => (
          <div
            key={artista.id}
            style={{
              backgroundColor: "#1E1E1E",
              padding: "1rem",
              borderRadius: "8px",
              width: "180px",
              textAlign: "center",
            }}
          >
            <img
              src={artista.image}
              alt={artista.name}
              style={{
                width: "100%",
                borderRadius: "999px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <p>{artista.name}</p>
            <Link to={`/artista/${artista.id}`}>
              <button style={{ marginTop: "0.5rem" }}>Ver canciones</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsList;
