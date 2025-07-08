import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { uploadImage } from "../services/imageUploadService";

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: "admin" | "artista" | "regular",
  image: File,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  const url = await uploadImage(image);

  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    name,
    email,
    role,
    image: url,
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  return { user, data: userDoc.data() };
};
