import {
    collection,
    onSnapshot,
    query,
    orderBy,
    limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const subscribeToNotifications = (callback) => {
    const q = query(
        collection(db, 'notifications'),
        orderBy('createdAt', 'desc'),
        limit(20)
    );

    const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
            const notifications = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                };
            });
            callback(notifications);
        },
        (error) => {
            console.error('Error listening to notifications:', error);
            setTimeout(() => {
                subscribeToNotifications(callback);
            }, 5000);
        }
    );

    return unsubscribe;
};
