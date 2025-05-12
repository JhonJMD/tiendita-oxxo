import React from 'react';

function SelectInput({
    id,
    label,
    name = null,
    value,
    onChange,
    options = [],
    required = false,
    placeholder = 'Seleccione una opción',
    className = '',
    error = null
}) {
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                name={name || id}
                value={value}
                onChange={onChange}
                required={required}
                className={error ? 'input-error' : ''}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default SelectInput;