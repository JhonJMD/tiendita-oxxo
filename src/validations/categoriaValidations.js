import * as Yup from 'yup';

export const CategoriaSchema = Yup.object().shape({
    descripcion: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede superar los 100 caracteres')
        .required('El nombre es requerido'),

    estado: Yup.number()
        .oneOf([0, 1], 'El estado debe ser 0 (Inactivo) o 1 (Activo)')
        .required('El estado es requerido'),
});