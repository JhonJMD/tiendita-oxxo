import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function LoadingOverlay({ visible, message = 'Cargando...' }) {
    if (!visible) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <FaSpinner className="loading-spinner-icon" />
                <span className="loading-message">{message}</span>
            </div>
        </div>
    );
}

export default LoadingOverlay;