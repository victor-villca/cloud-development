import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { uploadAudio } from "../services/audioUploadService";
import { Cancion } from "../models/Cancion";

export const subirCancion = async (
  nombre: string,
  audio: File,
  artistaId: string,
  generoId: string,
) => {
  const audioUrl = await uploadAudio(audio);

  await addDoc(collection(db, "canciones"), {
    nombre,
    audioUrl,
    artistaId,
    generoId,
  });
};

export const getCancionesPorArtista = async (
  artistaId: string,
): Promise<Cancion[]> => {
  const q = query(
    collection(db, "canciones"),
    where("artistaId", "==", artistaId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      nombre: data.nombre,
      audioUrl: data.audioUrl,
      artistaId: data.artistaId,
      generoId: data.generoId,
    };
  });
};
