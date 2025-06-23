import React from 'react';

function PostModal({
    showModal,
    formData,
    onClose,
    onSubmit,
    onChange,
    onImageChange,
}) {
    if (!showModal) return null;

    return (
        <>
            <div className="dialog-backdrop" onClick={onClose}></div>
            <div className="dialog-popup">
                <div className="dialog-header">
                    <h3>Nueva Publicación</h3>
                    <button onClick={onClose} className="dialog-close">
                        ✕
                    </button>
                </div>

                <div className="dialog-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                                className="form-input"
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
                                onChange={onChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={onChange}
                                className="form-input"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Imagen</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={onImageChange}
                                className="form-input"
                            />
                        </div>
                        <div className="dialog-actions">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-cancel"
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Crear Publicación
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PostModal;
