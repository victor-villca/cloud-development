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
    orderBy,
} from 'firebase/firestore';

const db = getFirestore();

export const createPost = async (
    userId,
    title,
    subject,
    content,
    imageUrl,
    userName
) => {
    try {
        const postRef = await addDoc(collection(db, 'posts'), {
            userId,
            title,
            subject,
            content,
            imageUrl,
            createdAt: serverTimestamp(),
        });
        await addDoc(collection(db, 'notifications'), {
            type: 'new_post',
            userId,
            userName: userName || 'Someone',
            postTitle: title,
            message: `${userName || 'Someone'} posted: "${title}"`,
            createdAt: serverTimestamp(),
            read: false,
        });

        return postRef;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const getPostsByUser = async (userId) => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getAllPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deletePost = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
};
