import React from 'react';

function FormInput({
    id,
    label,
    name = null,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder = '',
    className = '',
    error = null
}) {
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name || id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={error ? 'input-error' : ''}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default FormInput;