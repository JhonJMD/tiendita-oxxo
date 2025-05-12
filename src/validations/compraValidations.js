import * as Yup from 'yup';

export const CompraDetalleSchema = Yup.object().shape({
    productoId: Yup.string()
        .required('Debe seleccionar un producto'),

    cantidad: Yup.number()
        .positive('La cantidad debe ser un valor positivo')
        .integer('La cantidad debe ser un número entero')
        .required('La cantidad es requerida'),
});

export const CompraSchema = Yup.object().shape({
    clienteId: Yup.string()
        .required('Debe seleccionar un cliente'),

    productos: Yup.array()
        .min(1, 'Debe agregar al menos un producto a la compra')
        .required('Debe agregar productos a la compra'),
});