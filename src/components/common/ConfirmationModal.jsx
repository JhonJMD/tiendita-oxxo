import React from 'react';
import Modal from 'react-modal';

// Asegurar que modal se monte en el elemento raíz de la aplicación
Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
        width: '90%',
        borderRadius: '8px',
        padding: '20px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000,
    },
};

function ConfirmationModal({
    isOpen,
    onRequestClose,
    onConfirm,
    title,
    message,
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar',
    type = 'warning' // 'warning', 'danger', 'info'
}) {
    let buttonClass = 'btn-primary';

    if (type === 'danger') {
        buttonClass = 'btn-delete';
    } else if (type === 'warning') {
        buttonClass = 'btn-warning';
    } else if (type === 'info') {
        buttonClass = 'btn-info';
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={title}
        >
            <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
            </div>
            <div className="modal-body">
                <p>{message}</p>
            </div>
            <div className="modal-footer">
                <button
                    onClick={onRequestClose}
                    className="btn btn-secondary"
                >
                    {cancelButtonText}
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        onRequestClose();
                    }}
                    className={`btn ${buttonClass}`}
                >
                    {confirmButtonText}
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;