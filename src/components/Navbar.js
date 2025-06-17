import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../styles.css';

export default function Navbar({ user }) {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <nav className="navbar-emoscan">
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <strong>EmoScan</strong>
                </Link>
            </div>

            <div className="navbar-center">
                <Link to="/settings" className="navbar-settings-link">
                    Settings
                </Link>
            </div>

            <div className="navbar-user">
                <span className="user-name">
                    {user?.displayName || user?.email}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
}
