import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import {
    linkWithPopup,
    EmailAuthProvider,
    linkWithCredential,
    unlink,
} from 'firebase/auth';

export default function Settings({ user }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLinked = (providerId) =>
        user.providerData.some(
            (provider) => provider.providerId === providerId
        );

    const unlinkProvider = (providerId) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No user is currently signed in.');
            return;
        }

        if (currentUser.providerData.length === 1) {
            alert('You cannot unlink the only sign-in method.');
            return;
        }
        unlink(currentUser, providerId)
            .then(() => {
                alert(`Unlinked ${providerId} successfully.`);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Unlink error:', error);
                alert(`Error unlinking ${providerId}: ${error.message}`);
            });
    };

    const linkGoogle = () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No user is currently signed in.');
            return;
        }

        linkWithPopup(currentUser, googleProvider)
            .then(() => {
                alert('Google linked!');
                window.location.reload();
            })
            .catch((e) => {
                console.error('Link Google error:', e);
                alert(e.message);
            });
    };

    const linkFacebook = () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No user is currently signed in.');
            return;
        }

        linkWithPopup(currentUser, facebookProvider)
            .then(() => {
                alert('Facebook linked!');
                window.location.reload();
            })
            .catch((e) => {
                console.error('Link Facebook error:', e);
                alert(e.message);
            });
    };

    const linkEmailPassword = () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No user is currently signed in.');
            return;
        }

        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        const credential = EmailAuthProvider.credential(email, password);
        linkWithCredential(currentUser, credential)
            .then(() => {
                alert('Email/password linked!');
                setEmail('');
                setPassword('');
                window.location.reload();
            })
            .catch((e) => {
                console.error('Link email/password error:', e);
                alert(e.message);
            });
    };

    return (
        <div className="container">
            <h2>Account Settings</h2>
            <p>
                <strong>Display Name:</strong> {user.displayName || 'N/A'}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            {user.photoURL && (
                <img
                    src={user.photoURL}
                    alt="profile"
                    style={{ width: 80, borderRadius: '50%' }}
                />
            )}

            <hr />
            <h3>Google</h3>
            {isLinked('google.com') ? (
                <button onClick={() => unlinkProvider('google.com')}>
                    Unlink Google
                </button>
            ) : (
                <button onClick={linkGoogle}>Link Google</button>
            )}

            <h3>Facebook</h3>
            {isLinked('facebook.com') ? (
                <button onClick={() => unlinkProvider('facebook.com')}>
                    Unlink Facebook
                </button>
            ) : (
                <button onClick={linkFacebook}>Link Facebook</button>
            )}

            <h3>Email/Password</h3>
            {isLinked('password') ? (
                <button onClick={() => unlinkProvider('password')}>
                    Unlink Email/Password
                </button>
            ) : (
                <>
                    <input
                        type="email"
                        placeholder="New Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={linkEmailPassword}>
                        Link Email/Password
                    </button>
                </>
            )}
        </div>
    );
}
