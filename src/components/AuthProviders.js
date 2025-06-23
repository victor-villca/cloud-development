import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../config/firebase';
import {
    linkWithPopup,
    EmailAuthProvider,
    linkWithCredential,
    unlink,
} from 'firebase/auth';

export default function AuthProviders({ user }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLinked = (providerId) =>
        user?.providerData.some(
            (provider) => provider.providerId === providerId
        );

    const unlinkProvider = async (providerId) => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No hay usuario autenticado');
            return;
        }

        if (currentUser.providerData.length === 1) {
            alert('No puedes desconectar el único método de autenticación');
            return;
        }

        try {
            await unlink(currentUser, providerId);
            alert(`${providerId} desconectado exitosamente`);
            window.location.reload();
        } catch (error) {
            console.error('Error al desconectar:', error);
            alert(`Error al desconectar ${providerId}: ${error.message}`);
        }
    };

    const linkGoogle = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No hay usuario autenticado');
            return;
        }

        try {
            await linkWithPopup(currentUser, googleProvider);
            alert('Google conectado exitosamente');
            window.location.reload();
        } catch (error) {
            console.error('Error conectando Google:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const linkFacebook = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No hay usuario autenticado');
            return;
        }

        try {
            await linkWithPopup(currentUser, facebookProvider);
            alert('Facebook conectado exitosamente');
            window.location.reload();
        } catch (error) {
            console.error('Error conectando Facebook:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const linkEmailPassword = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('No hay usuario autenticado');
            return;
        }

        if (!email || !password) {
            alert('Por favor ingresa email y contraseña');
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(email, password);
            await linkWithCredential(currentUser, credential);
            alert('Email/contraseña conectado exitosamente');
            setEmail('');
            setPassword('');
            window.location.reload();
        } catch (error) {
            console.error('Error conectando email/contraseña:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="auth-providers">
            <h3>Métodos de Autenticación</h3>

            <div className="provider-section">
                <h4>Google</h4>
                {isLinked('google.com') ? (
                    <button
                        onClick={() => unlinkProvider('google.com')}
                        className="btn btn-danger"
                    >
                        Desconectar Google
                    </button>
                ) : (
                    <button onClick={linkGoogle} className="btn btn-secondary">
                        Conectar Google
                    </button>
                )}
            </div>

            <div className="provider-section">
                <h4>Facebook</h4>
                {isLinked('facebook.com') ? (
                    <button
                        onClick={() => unlinkProvider('facebook.com')}
                        className="btn btn-danger"
                    >
                        Desconectar Facebook
                    </button>
                ) : (
                    <button
                        onClick={linkFacebook}
                        className="btn btn-secondary"
                    >
                        Conectar Facebook
                    </button>
                )}
            </div>

            <div className="provider-section">
                <h4>Email/Contraseña</h4>
                {isLinked('password') ? (
                    <button
                        onClick={() => unlinkProvider('password')}
                        className="btn btn-danger"
                    >
                        Desconectar Email/Contraseña
                    </button>
                ) : (
                    <div className="email-password-form">
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <button
                            onClick={linkEmailPassword}
                            className="btn btn-secondary"
                        >
                            Conectar Email/Contraseña
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
