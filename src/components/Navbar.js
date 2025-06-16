import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Navbar({ user }) {
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
            }}
        >
            <div>
                <strong>EmoScan</strong>
            </div>
            <Link to="/settings" style={{ color: 'white', marginRight: 10 }}>
                Settings
            </Link>
            <div>
                {user.displayName || user.email}
                <button
                    onClick={handleLogout}
                    style={{
                        marginLeft: 10,
                        backgroundColor: 'white',
                        color: '#007bff',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
