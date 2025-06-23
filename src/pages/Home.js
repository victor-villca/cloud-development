import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles.css';
import { uploadImageToCloudinary } from '../config/cloudinary';
import {
    createPost,
    getPostsByUser,
    deletePost,
} from '../services/postService';
import PostModal from '../components/PostModal';
import PostList from '../components/PostList';

function Home() {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        content: '',
    });
    const [image, setImage] = useState(null);

    const fetchPosts = async () => {
        if (!user) return;
        try {
            const data = await getPostsByUser(user.uid);
            setPosts(data);
        } catch (err) {
            console.error('Error al obtener publicaciones:', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            let imageUrl = '';
            if (image) {
                imageUrl = await uploadImageToCloudinary(image);
            }
            const userName = user.displayName || user.email || 'Anonymous User';
            await createPost(
                user.uid,
                formData.title,
                formData.subject,
                formData.content,
                imageUrl,
                userName
            );
            await fetchPosts();
            setFormData({ title: '', subject: '', content: '' });
            setImage(null);
            setShowModal(false);
            console.log(
                'Post created successfully! Notification sent to all users.'
            );
        } catch (err) {
            console.error('Error al crear publicación:', err);
            alert('Error creating post: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost(id);
            await fetchPosts();
        } catch (err) {
            console.error('Error al eliminar publicación:', err);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ title: '', subject: '', content: '' });
        setImage(null);
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

                <PostModal
                    showModal={showModal}
                    formData={formData}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onImageChange={handleImageChange}
                />

                <PostList posts={posts} onDelete={handleDelete} />
            </div>
        </div>
    );
}

export default Home;
