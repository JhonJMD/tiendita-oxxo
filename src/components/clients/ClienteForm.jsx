import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ClienteSchema } from '../../validations/clienteValidations';
import Button from '../common/Button';
import FieldHelper from '../common/FieldHelper';
import LoadingOverlay from '../common/LoadingOverlay';
import { createCliente, updateCliente } from '../../api/services/clienteService';
import { showSuccess, showError } from '../../utils/notifications';
import { FaSave, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

function ClienteForm({ cliente = null, onSuccess, onCancel }) {
    const isEditing = !!cliente;
    const [loading, setLoading] = useState(false);

    const initialValues = {
        id: cliente?.id || '',
        nombre: cliente?.nombre || '',
        apellido: cliente?.apellido || '',
        celular: cliente?.celular?.toString() || '',
        direccion: cliente?.direccion || '',
        correoElectronico: cliente?.correoElectronico || '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);

            const clienteData = {
                id: values.id.trim(),
                nombre: values.nombre.trim(),
                apellido: values.apellido.trim(),
                celular: parseInt(values.celular),
                direccion: values.direccion.trim(),
                correoElectronico: values.correoElectronico.trim(),
            };

            let result;

            if (isEditing) {
                result = await updateCliente(cliente.id, clienteData);
                showSuccess('Cliente actualizado con éxito');
            } else {
                result = await createCliente(clienteData);
                showSuccess('Cliente añadido con éxito');
                resetForm();
            }

            if (onSuccess) {
                onSuccess(result);
            }
        } catch (error) {
            showError(`Error al ${isEditing ? 'actualizar' : 'crear'} el cliente: ${error.message}`);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="cliente-form">
            <h2>{isEditing ? 'Editar Cliente' : 'Registro de Clientes'}</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={ClienteSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="form-grid">
                        <div className="form-group">
                            <label htmlFor="id">Cédula</label>
                            <Field
                                id="id"
                                name="id"
                                type="text"
                                placeholder="Ej. 1098765432"
                                className={errors.id && touched.id ? 'input-error' : ''}
                                disabled={isEditing} // No permitir editar la cédula en modo edición
                            />
                            <ErrorMessage name="id" component="div" className="error-message" />
                            <FieldHelper icon={<FaInfoCircle />}>
                                La cédula debe tener entre 5 y 20 caracteres.
                            </FieldHelper>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                id="nombre"
                                name="nombre"
                                type="text"
                                placeholder="Nombre"
                                className={errors.nombre && touched.nombre ? 'input-error' : ''}
                            />
                            <ErrorMessage name="nombre" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <Field
                                id="apellido"
                                name="apellido"
                                type="text"
                                placeholder="Apellido"
                                className={errors.apellido && touched.apellido ? 'input-error' : ''}
                            />
                            <ErrorMessage name="apellido" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="celular">Celular</label>
                            <Field
                                id="celular"
                                name="celular"
                                type="text"
                                placeholder="Ej. 3124567890"
                                className={errors.celular && touched.celular ? 'input-error' : ''}
                            />
                            <ErrorMessage name="celular" component="div" className="error-message" />
                            <FieldHelper icon={<FaInfoCircle />}>
                                El celular debe contener solo números y tener entre 7 y 15 dígitos.
                            </FieldHelper>
                        </div>

                        <div className="form-group">
                            <label htmlFor="direccion">Dirección</label>
                            <Field
                                id="direccion"
                                name="direccion"
                                type="text"
                                placeholder="Ej. Calle 123 #45-67"
                                className={errors.direccion && touched.direccion ? 'input-error' : ''}
                            />
                            <ErrorMessage name="direccion" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="correoElectronico">Correo Electrónico</label>
                            <Field
                                id="correoElectronico"
                                name="correoElectronico"
                                type="email"
                                placeholder="Ej. usuario@gmail.com"
                                className={errors.correoElectronico && touched.correoElectronico ? 'input-error' : ''}
                            />
                            <ErrorMessage name="correoElectronico" component="div" className="error-message" />
                        </div>

                        <div className="button-group">
                            <Button
                                type="submit"
                                disabled={isSubmitting || loading}
                                icon={<FaSave />}
                            >
                                {isEditing ? 'Guardar Cambios' : 'Añadir Cliente'}
                            </Button>
                            <Button
                                onClick={onCancel}
                                className="btn-secondary"
                                disabled={isSubmitting || loading}
                                type="button"
                                icon={<FaArrowLeft />}
                            >
                                {isEditing ? 'Cancelar' : 'Ver Clientes'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <LoadingOverlay
                visible={loading}
                message={isEditing ? 'Actualizando cliente...' : 'Creando cliente...'}
            />
        </div>
    );
}

export default ClienteForm;