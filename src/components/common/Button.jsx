import React from 'react';

function Button({
    children,
    onClick,
    type = 'button',
    className = 'btn-primary',
    disabled = false,
    icon = null,
    iconPosition = 'left'
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${className} ${icon ? 'btn-with-icon' : ''} ${iconPosition === 'right' ? 'icon-right' : 'icon-left'}`}
            disabled={disabled}
        >
            {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{children}</span>
            {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
        </button>
    );
}

export default Button;