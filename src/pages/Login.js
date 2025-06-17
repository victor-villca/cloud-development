import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import '../styles.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginWithEmail = async () => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const registerWithEmail = async () => {
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithFacebook = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, facebookProvider);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>

            <div className="form-group">
                <input
                    className="login-input"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <div className="form-group">
                <input
                    className="login-input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <div className="form-group">
                <button
                    className="btn btn-primary"
                    onClick={loginWithEmail}
                    disabled={isLoading}
                    style={{ width: '100%', marginBottom: '10px' }}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={registerWithEmail}
                    disabled={isLoading}
                    style={{ width: '100%' }}
                >
                    {isLoading ? 'Cargando...' : 'Registrarse'}
                </button>
            </div>

            <div className="login-divider">
                <span>O continúa con</span>
            </div>

            <div className="form-group">
                <button
                    className="btn btn-google"
                    onClick={loginWithGoogle}
                    disabled={isLoading}
                    style={{ width: '100%', marginBottom: '10px' }}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar con Google'}
                </button>

                <button
                    className="btn btn-facebook"
                    onClick={loginWithFacebook}
                    disabled={isLoading}
                    style={{ width: '100%' }}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar con Facebook'}
                </button>
            </div>
        </div>
    );
}
