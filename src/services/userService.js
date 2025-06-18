import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function getUserProfile(uid) {
    if (!uid) return null;
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
}

export async function saveUserProfile(uid, profileData) {
    if (!uid) throw new Error('User ID is required');
    await setDoc(doc(db, 'users', uid), profileData, { merge: true });
}