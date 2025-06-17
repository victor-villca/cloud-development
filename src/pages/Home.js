import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles.css';

function Home() {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        content: '',
    });

    useEffect(() => {
        if (user) {
            const q = query(
                collection(db, 'posts'),
                where('userId', '==', user.uid)
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setPosts(data);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        try {
            await addDoc(collection(db, 'posts'), {
                ...formData,
                userId: user.uid,
                createdAt: new Date(),
            });
            setFormData({ title: '', subject: '', content: '' });
            setShowModal(false);
        } catch (err) {
            console.error('Error adding post:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'posts', id));
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ title: '', subject: '', content: '' });
    };

    return (
        <div className="settings-container">
            <div className="settings-content">
                <div className="settings-header">
                    <h2>Mis Publicaciones</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary"
                    >
                        Agregar Nueva Publicación
                    </button>
                </div>
                {showModal && (
                    <>
                        <div
                            className="dialog-backdrop"
                            onClick={closeModal}
                        ></div>
                        <div className="dialog-popup">
                            <div className="dialog-header">
                                <h3>Nueva Publicación</h3>
                                <button
                                    onClick={closeModal}
                                    className="dialog-close"
                                    aria-label="Cerrar"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="dialog-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Título</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Ingresa el título de tu publicación"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Tema</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="¿De qué tema es tu publicación?"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="content">
                                            Contenido
                                        </label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            className="form-input"
                                            rows="4"
                                            placeholder="Escribe el contenido de tu publicación..."
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="dialog-actions">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="btn btn-cancel"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Crear Publicación
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}

                <div className="profile-form">
                    <h3>Lista de Publicaciones</h3>
                    {posts.length === 0 ? (
                        <p>
                            No tienes publicaciones aún. ¡Crea tu primera
                            publicación!
                        </p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="provider-section">
                                <h4>{post.title}</h4>
                                <p>
                                    <strong>Tema:</strong> {post.subject}
                                </p>
                                <p>{post.content}</p>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="btn btn-danger"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
