import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CategoriaSchema } from '../../validations/categoriaValidations';
import Button from '../common/Button';
import FieldHelper from '../common/FieldHelper';
import LoadingOverlay from '../common/LoadingOverlay';
import { createCategoria, updateCategoria } from '../../api/services/categoriaService';
import { showSuccess, showError } from '../../utils/notifications';
import { FaSave, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

function CategoriaForm({ categoria = null, onSuccess, onCancel }) {
    const isEditing = !!categoria;
    const [loading, setLoading] = useState(false);

    const initialValues = {
        descripcion: categoria?.descripcion || '',
        estado: categoria?.estado?.toString() || '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);

            const categoriaData = {
                descripcion: values.descripcion.trim(),
                estado: parseInt(values.estado),
            };

            let result;

            if (isEditing) {
                result = await updateCategoria(categoria.idCategoria, {
                    ...categoriaData,
                    idCategoria: categoria.idCategoria,
                });
                showSuccess('Categoría actualizada con éxito');
            } else {
                result = await createCategoria(categoriaData);
                showSuccess('Categoría añadida con éxito');
                resetForm();
            }

            if (onSuccess) {
                onSuccess(result);
            }
        } catch (error) {
            showError(`Error al ${isEditing ? 'actualizar' : 'crear'} la categoría: ${error.message}`);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="categoria-form">
            <h2>{isEditing ? 'Editar Categoría' : 'Registro de Categorías'}</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={CategoriaSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="descripcion">Nombre</label>
                            <Field
                                id="descripcion"
                                name="descripcion"
                                type="text"
                                placeholder="Ej. Refrescos"
                                className={errors.descripcion && touched.descripcion ? 'input-error' : ''}
                            />
                            <ErrorMessage name="descripcion" component="div" className="error-message" />
                            <FieldHelper icon={<FaInfoCircle />}>
                                El nombre de la categoría debe tener entre 3 y 100 caracteres.
                            </FieldHelper>
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
                                {isEditing ? 'Guardar Cambios' : 'Añadir Categoría'}
                            </Button>
                            <Button
                                onClick={onCancel}
                                className="btn-secondary"
                                disabled={isSubmitting || loading}
                                type="button"
                                icon={<FaArrowLeft />}
                            >
                                {isEditing ? 'Cancelar' : 'Ver Categorías'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <LoadingOverlay
                visible={loading}
                message={isEditing ? 'Actualizando categoría...' : 'Creando categoría...'}
            />
        </div>
    );
}

export default CategoriaForm;