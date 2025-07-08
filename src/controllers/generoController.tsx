import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { uploadImage } from "../services/imageUploadService";

export const createGenero = async (nombre: string, imagen: File) => {
  const url = await uploadImage(imagen);
  await addDoc(collection(db, "generos"), {
    nombre,
    imagen: url,
  });
};

export const getGeneros = async () => {
  const snapshot = await getDocs(collection(db, "generos"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
