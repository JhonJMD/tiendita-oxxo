import * as Yup from 'yup';

export const ClienteSchema = Yup.object().shape({
    id: Yup.string()
        .min(5, 'La cédula debe tener al menos 5 caracteres')
        .max(20, 'La cédula no puede superar los 20 caracteres')
        .required('La cédula es requerida'),

    nombre: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede superar los 50 caracteres')
        .required('El nombre es requerido'),

    apellido: Yup.string()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no puede superar los 50 caracteres')
        .required('El apellido es requerido'),

    celular: Yup.string()
        .matches(/^\d+$/, 'El celular debe contener solo números')
        .min(7, 'El celular debe tener al menos 7 dígitos')
        .max(15, 'El celular no puede superar los 15 dígitos')
        .required('El celular es requerido'),

    direccion: Yup.string()
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .max(100, 'La dirección no puede superar los 100 caracteres')
        .required('La dirección es requerida'),

    correoElectronico: Yup.string()
        .email('Ingrese un correo electrónico válido')
        .required('El correo electrónico es requerido'),
});