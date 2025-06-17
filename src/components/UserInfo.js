import React from 'react';

export default function UserInfo({ user }) {
    if (!user) {
        return (
            <div className="user-info">
                <p>No hay usuario autenticado</p>
            </div>
        );
    }

    return (
        <div className="user-info">
            <h3>Información de Cuenta</h3>

            <div className="user-details">
                {user.photoURL && (
                    <div className="profile-photo">
                        <img
                            src={user.photoURL}
                            alt="Foto de perfil"
                            className="profile-image"
                        />
                    </div>
                )}

                <div className="user-data">
                    <div className="info-item">
                        <strong>Nombre:</strong>
                        <span>{user.displayName || 'No especificado'}</span>
                    </div>

                    <div className="info-item">
                        <strong>Email:</strong>
                        <span>{user.email || 'No especificado'}</span>
                    </div>

                    <div className="info-item">
                        <strong>Verificado:</strong>
                        <span
                            className={
                                user.emailVerified ? 'verified' : 'not-verified'
                            }
                        >
                            {user.emailVerified ? 'Sí' : 'No'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
