import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import ConfirmationModal from '../common/ConfirmationModal';
import { getProductos, deleteProducto } from '../../api/services/productoService';
import { showSuccess, showError } from '../../utils/notifications';
import { formatCurrency } from '../../utils/formatters';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';

function ProductosList({ onEdit, onReturn }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        const loadProductos = async () => {
            try {
                setLoading(true);
                const data = await getProductos();
                setProductos(data);
            } catch (err) {
                setError('Error al cargar los productos: ' + err.message);
                showError('Error al cargar los productos: ' + err.message);
                console.error('Error al cargar productos:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProductos();
    }, []);

    const openDeleteModal = (idProducto) => {
        setSelectedProductId(idProducto);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedProductId(null);
    };

    const handleDelete = async () => {
        if (!selectedProductId) return;

        try {
            await deleteProducto(selectedProductId);
            setProductos(productos.filter(prod => prod.idProducto !== selectedProductId));
            showSuccess('Producto eliminado con éxito');
        } catch (err) {
            showError('Error al eliminar el producto: ' + err.message);
        }
    };

    if (loading) {
        return <div className="loading-spinner">Cargando productos...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="productos-list">
            <h2>Listado de Productos</h2>
            <Button
                onClick={onReturn}
                className="btn-primary"
                icon={<FaArrowLeft />}
            >
                Volver al Registro
            </Button>

            {productos.length === 0 ? (
                <div className="empty-state">
                    <p>No hay productos registrados.</p>
                    <Button
                        onClick={onReturn}
                        className="btn-primary"
                        icon={<FaPlus />}
                    >
                        Registrar Producto
                    </Button>
                </div>
            ) : (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Código de Barras</th>
                                <th>Nombre</th>
                                <th>Precio (COP)</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.idProducto}>
                                    <td>{producto.codigoBarras}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{formatCurrency(producto.precioVenta)}</td>
                                    <td>{producto.cantidadStock}</td>
                                    <td>{producto.categoria.descripcion}</td>
                                    <td>
                                        <span className={`status-badge ${producto.estado === 1 ? 'status-active' : 'status-inactive'}`}>
                                            {producto.estado === 1 ? "Activo" : "Desactivado"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <Button
                                                onClick={() => onEdit(producto.idProducto)}
                                                className="btn-edit"
                                                icon={<FaEdit />}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                onClick={() => openDeleteModal(producto.idProducto)}
                                                className="btn-delete"
                                                icon={<FaTrash />}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmationModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onConfirm={handleDelete}
                title="Confirmar eliminación"
                message="¿Está seguro que desea eliminar este producto? Esta acción no se puede deshacer."
                confirmButtonText="Eliminar"
                cancelButtonText="Cancelar"
                type="danger"
            />
        </div>
    );
}

export default ProductosList;