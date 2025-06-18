import React from 'react';

function PostList({ posts, onDelete }) {
    if (posts.length === 0) {
        return (
            <div className="profile-form">
                <h3>Lista de Publicaciones</h3>
                <p>No tienes publicaciones aún. ¡Crea tu primera publicación!</p>
            </div>
        );
    }

    return (
        <div className="profile-form">
            <h3>Lista de Publicaciones</h3>
            {posts.map((post) => (
                <div key={post.id} className="provider-section">
                    <h4>{post.title}</h4>
                    <p><strong>Tema:</strong> {post.subject}</p>
                    <p>{post.content}</p>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt="Publicación"
                            style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '10px' }}
                        />
                    )}
                    <button
                        onClick={() => onDelete(post.id)}
                        className="btn btn-danger"
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PostList;