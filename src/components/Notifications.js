import { useState, useEffect, useRef } from 'react';
import { subscribeToNotifications } from '../services/notificationService';

function Notifications({ currentUserId }) {
    const [notifications, setNotifications] = useState([]);
    const isFirstLoadRef = useRef(true);
    const previousNotificationsRef = useRef([]);

    useEffect(() => {
        const unsubscribe = subscribeToNotifications((newNotifications) => {
            if (isFirstLoadRef.current) {
                setNotifications(newNotifications);
                previousNotificationsRef.current = newNotifications;
                isFirstLoadRef.current = false;
                return;
            }
            const previousIds = new Set(
                previousNotificationsRef.current.map((n) => n.id)
            );
            const brandNewNotifications = newNotifications.filter(
                (newNotif) =>
                    !previousIds.has(newNotif.id) &&
                    newNotif.userId !== currentUserId
            );

            if (brandNewNotifications.length > 0) {
                brandNewNotifications.forEach((notif) => {
                    console.log('New opst notificatiom:', notif.message);
                    alert(`New opst notificatiom: ${notif.message}`);
                });
            }
            setNotifications(newNotifications);
            previousNotificationsRef.current = newNotifications;
        });

        return () => {
            unsubscribe();
        };
    }, [currentUserId]);

    return null;
}

export default Notifications;
