import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProductoSchema } from '../../validations/productValidations';
import Button from '../common/Button';
import FieldHelper from '../common/FieldHelper';
import LoadingOverlay from '../common/LoadingOverlay';
import { createProducto, updateProducto } from '../../api/services/productoService';
import { getCategorias } from '../../api/services/categoriaService';
import { showSuccess, showError } from '../../utils/notifications';
import { FaSave, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

function ProductoForm({ producto = null, onSuccess, onCancel }) {
    const isEditing = !!producto;
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCategorias, setLoadingCategorias] = useState(true);

    useEffect(() => {
        const loadCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (err) {
                showError('Error al cargar categorías: ' + err.message);
                console.error('Error al cargar categorías:', err);
            } finally {
                setLoadingCategorias(false);
            }
        };

        loadCategorias();
    }, []);

    const initialValues = {
        nombre: producto?.nombre || '',
        codigoBarras: producto?.codigoBarras || '',
        precioVenta: producto?.precioVenta || '',
        cantidadStock: producto?.cantidadStock || '',
        estado: producto?.estado?.toString() || '',
        categoriaId: producto?.categoria?.idCategoria?.toString() || '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);

            const productoData = {
                nombre: values.nombre.trim(),
                codigoBarras: values.codigoBarras.trim(),
                precioVenta: parseFloat(values.precioVenta),
                cantidadStock: parseInt(values.cantidadStock),
                estado: parseInt(values.estado),
                categoria: {
                    idCategoria: parseInt(values.categoriaId),
                },
            };

            let result;

            if (isEditing) {
                result = await updateProducto(producto.idProducto, {
                    ...productoData,
                    idProducto: producto.idProducto,
                });
                showSuccess('Producto actualizado con éxito');
            } else {
                result = await createProducto(productoData);
                showSuccess('Producto añadido con éxito');
                resetForm();
            }

            if (onSuccess) {
                onSuccess(result);
            }
        } catch (error) {
            showError(`Error al ${isEditing ? 'actualizar' : 'crear'} el producto: ${error.message}`);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    if (loadingCategorias) {
        return <div className="loading-spinner">Cargando...</div>;
    }

    return (
        <div className="producto-form">
            <h2>{isEditing ? 'Editar Producto' : 'Registro de Productos'}</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={ProductoSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="form-grid">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                id="nombre"
                                name="nombre"
                                type="text"
                                placeholder="Ej. Refresco Cola"
                                className={errors.nombre && touched.nombre ? 'input-error' : ''}
                            />
                            <ErrorMessage name="nombre" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="codigoBarras">Código de Barras</label>
                            <Field
                                id="codigoBarras"
                                name="codigoBarras"
                                type="text"
                                placeholder="Ej. PROD00000001"
                                className={errors.codigoBarras && touched.codigoBarras ? 'input-error' : ''}
                            />
                            <ErrorMessage name="codigoBarras" component="div" className="error-message" />
                            <FieldHelper icon={<FaInfoCircle />}>
                                El código de barras debe tener entre 8 y 150 caracteres alfanuméricos.
                            </FieldHelper>
                        </div>

                        <div className="form-group">
                            <label htmlFor="precioVenta">Precio de Venta (COP)</label>
                            <Field
                                id="precioVenta"
                                name="precioVenta"
                                type="number"
                                step="0.01"
                                placeholder="Ej. 15.50"
                                className={errors.precioVenta && touched.precioVenta ? 'input-error' : ''}
                            />
                            <ErrorMessage name="precioVenta" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cantidadStock">Cantidad en Stock</label>
                            <Field
                                id="cantidadStock"
                                name="cantidadStock"
                                type="number"
                                placeholder="Ej. 100"
                                className={errors.cantidadStock && touched.cantidadStock ? 'input-error' : ''}
                            />
                            <ErrorMessage name="cantidadStock" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoriaId">Categoría</label>
                            <Field
                                as="select"
                                id="categoriaId"
                                name="categoriaId"
                                className={errors.categoriaId && touched.categoriaId ? 'input-error' : ''}
                            >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat.idCategoria} value={cat.idCategoria}>
                                        {cat.descripcion}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoriaId" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <Field
                                as="select"
                                id="estado"
                                name="estado"
                                className={errors.estado && touched.estado ? 'input-error' : ''}
                            >
                                <option value="">Seleccione un estado</option>
                                <option value="1">Activo</option>
                                <option value="0">Desactivado</option>
                            </Field>
                            <ErrorMessage name="estado" component="div" className="error-message" />
                        </div>

                        <div className="button-group">
                            <Button
                                type="submit"
                                disabled={isSubmitting || loading}
                                icon={<FaSave />}
                            >
                                {isEditing ? 'Guardar Cambios' : 'Añadir Producto'}
                            </Button>
                            <Button
                                onClick={onCancel}
                                className="btn-secondary"
                                disabled={isSubmitting || loading}
                                type="button"
                                icon={<FaArrowLeft />}
                            >
                                {isEditing ? 'Cancelar' : 'Ver Productos'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <LoadingOverlay
                visible={loading}
                message={isEditing ? 'Actualizando producto...' : 'Creando producto...'}
            />
        </div>
    );
}

export default ProductoForm;