import React from 'react';
import UserInfo from '../components/UserInfo';
import ProfileForm from '../components/ProfileForm';
import AuthProviders from '../components/AuthProviders';

export default function Settings({ user }) {
    return (
        <div className="settings-container">
            <div className="settings-header">
                <h2>Configuración de Cuenta</h2>
            </div>

            <div className="settings-content">
                <UserInfo user={user} />

                <div className="settings-divider"></div>

                <ProfileForm user={user} />

                <div className="settings-divider"></div>

                <AuthProviders user={user} />
            </div>
        </div>
    );
}
