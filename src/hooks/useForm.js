import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Manejar campos anidados (por ejemplo: "categoria.idCategoria")
        if (name.includes('.')) {
            const [parentKey, childKey] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [childKey]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }

        // Limpiar error cuando el usuario corrige el campo
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const resetForm = () => {
        setFormData(initialState);
        setErrors({});
    };

    const setFieldValue = (name, value) => {
        // Manejar campos anidados
        if (name.includes('.')) {
            const [parentKey, childKey] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [childKey]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return {
        formData,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        setFormData,
        setFieldValue
    };
};