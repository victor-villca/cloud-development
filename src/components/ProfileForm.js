import React, { useState, useEffect } from 'react';
import { getUserProfile, saveUserProfile } from '../userService';

export default function ProfileForm({ user }) {
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        const loadProfile = async () => {
            try {
                const profile = await getUserProfile(user.uid);
                if (profile) {
                    setAddress(profile.address || '');
                    setBirthdate(profile.birthdate || '');
                    setAge(profile.age || '');
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        };

        loadProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user) {
            alert('Usuario no autenticado');
            return;
        }

        setLoading(true);
        try {
            await saveUserProfile(user.uid, {
                address,
                birthdate,
                age: Number(age),
            });
            alert('Perfil guardado correctamente');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Error al guardar el perfil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-form">
            <h3>Perfil Personal</h3>

            <div className="form-group">
                <label htmlFor="address">Dirección:</label>
                <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej. Calle 123"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="birthdate">Fecha de nacimiento:</label>
                <input
                    id="birthdate"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="age">Edad:</label>
                <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="0"
                    className="form-input"
                />
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                className="btn btn-primary"
            >
                {loading ? 'Guardando...' : 'Guardar Perfil'}
            </button>
        </div>
    );
}
