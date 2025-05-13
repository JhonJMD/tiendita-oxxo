import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CompraSchema } from '../../validations/compraValidations';
import Button from '../common/Button';
import FieldHelper from '../common/FieldHelper';
import LoadingOverlay from '../common/LoadingOverlay';
import { createCompra } from '../../api/services/compraService';
import { getProductos } from '../../api/services/productoService';
import { getClientes } from '../../api/services/clienteService';
import { showSuccess, showError, showWarning, showInfo } from '../../utils/notifications';
import { formatCurrency } from '../../utils/formatters';
import { FaPlus, FaTrash, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';

function CompraForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        clienteId: '',
        productosSeleccionados: [],
        detalle: {
            productoId: '',
            cantidad: '',
        },
        medioPago: '', // Nuevo campo añadido
    });

    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDatos, setLoadingDatos] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadDatos = async () => {
            try {
                const [clientesData, productosData] = await Promise.all([
                    getClientes(),
                    getProductos()
                ]);

                setClientes(clientesData);
                setProductos(productosData.filter(p => p.estado === 1 && p.cantidadStock > 0));
            } catch (err) {
                showError('Error al cargar datos: ' + err.message);
                console.error('Error al cargar datos:', err);
            } finally {
                setLoadingDatos(false);
            }
        };

        loadDatos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('detalle.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                detalle: {
                    ...prev.detalle,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Limpiar error
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateDetalle = () => {
        const newErrors = {};

        if (!formData.detalle.productoId) {
            newErrors['detalle.productoId'] = 'Debe seleccionar un producto';
        }

        if (!formData.detalle.cantidad) {
            newErrors['detalle.cantidad'] = 'Debe ingresar una cantidad';
        } else if (isNaN(parseInt(formData.detalle.cantidad)) || parseInt(formData.detalle.cantidad) <= 0) {
            newErrors['detalle.cantidad'] = 'La cantidad debe ser un número positivo';
        }

        setErrors(prev => ({
            ...prev,
            ...newErrors
        }));

        return Object.keys(newErrors).length === 0;
    };

    const agregarProducto = () => {
        if (!validateDetalle()) {
            return;
        }

        const productoId = parseInt(formData.detalle.productoId);
        const cantidad = parseInt(formData.detalle.cantidad);

        const productoSeleccionado = productos.find(p => p.idProducto === productoId);
        if (!productoSeleccionado) {
            showError('Producto no encontrado');
            return;
        }

        if (cantidad > productoSeleccionado.cantidadStock) {
            showWarning(`Stock insuficiente. Disponible: ${productoSeleccionado.cantidadStock}`);
            setErrors(prev => ({
                ...prev,
                'detalle.cantidad': `Stock insuficiente. Disponible: ${productoSeleccionado.cantidadStock}`
            }));
            return;
        }

        // Verificar si el producto ya está en la lista
        const productoExistente = formData.productosSeleccionados.find(
            p => p.idProducto === productoId
        );

        let nuevosProductos;

        if (productoExistente) {
            // Actualizar cantidad del producto existente
            nuevosProductos = formData.productosSeleccionados.map(p =>
                p.idProducto === productoId
                    ? {
                        ...p,
                        cantidad: p.cantidad + cantidad,
                        subtotal: (p.cantidad + cantidad) * p.precio
                    }
                    : p
            );
        } else {
            // Agregar nuevo producto
            nuevosProductos = [
                ...formData.productosSeleccionados,
                {
                    idProducto: productoId,
                    nombre: productoSeleccionado.nombre,
                    precio: productoSeleccionado.precioVenta,
                    cantidad,
                    subtotal: productoSeleccionado.precioVenta * cantidad,
                }
            ];
        }

        setFormData(prev => ({
            ...prev,
            productosSeleccionados: nuevosProductos,
            detalle: {
                productoId: '',
                cantidad: '',
            }
        }));

        showSuccess(`${productoSeleccionado.nombre} agregado a la compra`);
    };

    const eliminarProducto = (idProducto) => {
        setFormData(prev => ({
            ...prev,
            productosSeleccionados: prev.productosSeleccionados.filter(
                p => p.idProducto !== idProducto
            )
        }));

        showInfo('Producto eliminado de la compra');
    };

    const calcularTotal = () => {
        return formData.productosSeleccionados.reduce((total, producto) => total + producto.subtotal, 0);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.clienteId) {
            newErrors.clienteId = 'Debe seleccionar un cliente';
        }

        if (formData.productosSeleccionados.length === 0) {
            newErrors.productos = 'Debe agregar al menos un producto';
        }

        if (!formData.medioPago) {
            newErrors.medioPago = 'Debe seleccionar un medio de pago';
        }

        setErrors(prev => ({
            ...prev,
            ...newErrors
        }));

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showWarning('Por favor, complete correctamente todos los campos');
            return;
        }

        try {
            setLoading(true);

            const compraData = {
                cliente: {
                    id: formData.clienteId,
                },
                detalles: formData.productosSeleccionados.map(p => ({
                    producto: {
                        idProducto: p.idProducto,
                    },
                    cantidad: p.cantidad,
                    precioUnitario: p.precio,
                })),
                fecha: new Date().toISOString(), // Cambiado de fechaCompra a fecha
                total: calcularTotal(),
                estado: "P", // Cambiado de 1 a "P" (Pendiente)
                medioPago: formData.medioPago, // Nuevo campo añadido
            };

            const result = await createCompra(compraData);

            showSuccess('Compra registrada con éxito');

            // Resetear el formulario
            setFormData({
                clienteId: '',
                productosSeleccionados: [],
                detalle: {
                    productoId: '',
                    cantidad: '',
                },
                medioPago: '',
            });

            if (onSuccess) {
                onSuccess(result);
            }
        } catch (error) {
            showError('Error al registrar la compra: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const clienteOptions = clientes.map(cli => ({
        value: cli.id,
        label: `${cli.nombre} ${cli.apellido} - ${cli.id}`,
    }));

    const productoOptions = productos.map(prod => ({
        value: prod.idProducto.toString(),
        label: `${prod.nombre} - ${formatCurrency(prod.precioVenta)} (Stock: ${prod.cantidadStock})`,
    }));

    if (loadingDatos) {
        return <div className="loading-spinner">Cargando datos...</div>;
    }

    return (
        <div className="compra-form">
            <h2>Registro de Compras</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="clienteId">Cliente</label>
                    <select
                        id="clienteId"
                        name="clienteId"
                        value={formData.clienteId}
                        onChange={handleInputChange}
                        className={errors.clienteId ? 'input-error' : ''}
                    >
                        <option value="">Seleccione un cliente</option>
                        {clienteOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.clienteId && <div className="error-message">{errors.clienteId}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="medioPago">Medio de Pago</label>
                    <select
                        id="medioPago"
                        name="medioPago"
                        value={formData.medioPago}
                        onChange={handleInputChange}
                        className={errors.medioPago ? 'input-error' : ''}
                    >
                        <option value="">Seleccione un medio de pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                        <option value="Transferencia">Transferencia</option>
                    </select>
                    {errors.medioPago && <div className="error-message">{errors.medioPago}</div>}
                </div>

                <div className="agregar-producto">
                    <h3>Agregar Producto</h3>

                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="detalle.productoId">Producto</label>
                            <select
                                id="detalle.productoId"
                                name="detalle.productoId"
                                value={formData.detalle.productoId}
                                onChange={handleInputChange}
                                className={errors['detalle.productoId'] ? 'input-error' : ''}
                            >
                                <option value="">Seleccione un producto</option>
                                {productoOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors['detalle.productoId'] && <div className="error-message">{errors['detalle.productoId']}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="detalle.cantidad">Cantidad</label>
                            <input
                                id="detalle.cantidad"
                                name="detalle.cantidad"
                                type="number"
                                value={formData.detalle.cantidad}
                                onChange={handleInputChange}
                                placeholder="Ingrese la cantidad"
                                className={errors['detalle.cantidad'] ? 'input-error' : ''}
                                min="1"
                            />
                            {errors['detalle.cantidad'] && <div className="error-message">{errors['detalle.cantidad']}</div>}
                        </div>

                        <div className="form-group form-grid-full">
                            <Button
                                onClick={agregarProducto}
                                type="button"
                                className="btn-secondary"
                                icon={<FaPlus />}
                            >
                                Agregar a la compra
                            </Button>
                        </div>
                    </div>
                </div>

                {errors.productos && (
                    <div className="error-message">{errors.productos}</div>
                )}

                {formData.productosSeleccionados.length > 0 ? (
                    <div className="productos-seleccionados">
                        <h3>Productos en la compra</h3>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.productosSeleccionados.map((prod) => (
                                        <tr key={prod.idProducto}>
                                            <td>{prod.nombre}</td>
                                            <td>{formatCurrency(prod.precio)}</td>
                                            <td>{prod.cantidad}</td>
                                            <td>{formatCurrency(prod.subtotal)}</td>
                                            <td>
                                                <Button
                                                    onClick={() => eliminarProducto(prod.idProducto)}
                                                    type="button"
                                                    className="btn-delete"
                                                    icon={<FaTrash />}
                                                >
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="total-row">
                                        <td colSpan="3" className="total-label">Total:</td>
                                        <td className="total-value">{formatCurrency(calcularTotal())}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <p>No hay productos seleccionados. Agregue productos a la compra.</p>
                    </div>
                )}

                <div className="button-group">
                    <Button
                        type="submit"
                        disabled={loading || formData.productosSeleccionados.length === 0}
                        icon={<FaShoppingCart />}
                    >
                        {loading ? 'Procesando...' : 'Registrar Compra'}
                    </Button>
                </div>
            </form>

            <LoadingOverlay
                visible={loading}
                message="Registrando compra..."
            />
        </div>
    );
}

export default CompraForm;