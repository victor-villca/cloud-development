import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    doc,
    serverTimestamp,
} from 'firebase/firestore';

const db = getFirestore();

export const createPost = async (userId, title, subject, content) => {
    return await addDoc(collection(db, 'posts'), {
        userId,
        title,
        subject,
        content,
        createdAt: serverTimestamp(),
    });
};

export const getPostsByUser = async (userId) => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deletePost = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
};
