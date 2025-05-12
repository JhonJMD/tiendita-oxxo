import * as Yup from 'yup';

export const ProductoSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede superar los 100 caracteres')
        .required('El nombre es requerido'),

    codigoBarras: Yup.string()
        .min(8, 'El código de barras debe tener al menos 8 caracteres')
        .max(150, 'El código de barras no puede superar los 150 caracteres')
        .required('El código de barras es requerido')
        .test(
            'format-validation',
            'El formato del código de barras no es válido. Debe tener al menos 8 caracteres alfanuméricos.',
            (value) => {
                if (!value) return false;
                return /^[A-Za-z0-9]{8,}$/.test(value);
            }
        ),

    precioVenta: Yup.number()
        .positive('El precio debe ser un valor positivo')
        .required('El precio de venta es requerido'),

    cantidadStock: Yup.number()
        .min(0, 'La cantidad en stock no puede ser negativa')
        .integer('La cantidad en stock debe ser un número entero')
        .required('La cantidad en stock es requerida'),

    estado: Yup.number()
        .oneOf([0, 1], 'El estado debe ser 0 (Inactivo) o 1 (Activo)')
        .required('El estado es requerido'),

    categoriaId: Yup.number()
        .positive('Debe seleccionar una categoría válida')
        .required('La categoría es requerida'),
});