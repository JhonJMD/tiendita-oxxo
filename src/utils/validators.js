// Validar correo electrónico
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Validar que un campo no esté vacío
export const validateRequired = (value) => {
    if (typeof value === 'string') {
        return value.trim() !== '';
    }
    return value !== null && value !== undefined;
};

// Validar número
export const validateNumber = (value, options = {}) => {
    const { min, max, integer = false } = options;

    if (value === '' || value === null || value === undefined) {
        return false;
    }

    const num = Number(value);

    if (isNaN(num)) {
        return false;
    }

    if (integer && !Number.isInteger(num)) {
        return false;
    }

    if (min !== undefined && num < min) {
        return false;
    }

    if (max !== undefined && num > max) {
        return false;
    }

    return true;
};

// Validar longitud de texto
export const validateLength = (value, { min, max }) => {
    if (typeof value !== 'string') {
        return false;
    }

    const length = value.trim().length;

    if (min !== undefined && length < min) {
        return false;
    }

    if (max !== undefined && length > max) {
        return false;
    }

    return true;
};