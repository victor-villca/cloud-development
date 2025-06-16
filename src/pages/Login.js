import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginWithEmail = () => {
        signInWithEmailAndPassword(auth, email, password).catch((err) =>
            alert(err.message)
        );
    };

    const registerWithEmail = () => {
        createUserWithEmailAndPassword(auth, email, password).catch((err) =>
            alert(err.message)
        );
    };

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider).catch((err) =>
            alert(err.message)
        );
    };

    const loginWithFacebook = () => {
        signInWithPopup(auth, facebookProvider).catch((err) =>
            alert(err.message)
        );
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={loginWithEmail}>Login</button>
            <button onClick={registerWithEmail}>Register</button>
            <hr />
            <button onClick={loginWithGoogle}>Sign in with Google</button>
            <button onClick={loginWithFacebook}>Sign in with Facebook</button>
        </div>
    );
}
