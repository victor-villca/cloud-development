import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { uploadImage } from "../services/imageUploadService";
import { Genero } from "../models/Genero";

export const getGeneros = async (): Promise<Genero[]> => {
  const snapshot = await getDocs(collection(db, "generos"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      nombre: data.nombre,
      imagen: data.imagen,
    };
  });
};

export const createGenero = async (nombre: string, imagen: File) => {
  const imageUrl = await uploadImage(imagen);
  await addDoc(collection(db, "generos"), {
    nombre,
    imagen: imageUrl,
  });
};
