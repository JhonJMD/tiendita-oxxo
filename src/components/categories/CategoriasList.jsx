import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import ConfirmationModal from '../common/ConfirmationModal';
import { getCategorias, deleteCategoria } from '../../api/services/categoriaService';
import { showSuccess, showError } from '../../utils/notifications';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';

function CategoriasList({ onEdit, onReturn }) {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);

    useEffect(() => {
        const loadCategorias = async () => {
            try {
                setLoading(true);
                const data = await getCategorias();
                setCategorias(data);
            } catch (err) {
                setError('Error al cargar las categorías: ' + err.message);
                showError('Error al cargar las categorías: ' + err.message);
                console.error('Error al cargar categorías:', err);
            } finally {
                setLoading(false);
            }
        };

        loadCategorias();
    }, []);

    const openDeleteModal = (idCategoria) => {
        setSelectedCategoriaId(idCategoria);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCategoriaId(null);
    };

    const handleDelete = async () => {
        if (!selectedCategoriaId) return;

        try {
            await deleteCategoria(selectedCategoriaId);
            setCategorias(categorias.filter(cat => cat.idCategoria !== selectedCategoriaId));
            showSuccess('Categoría eliminada con éxito');
        } catch (err) {
            showError('Error al eliminar la categoría: ' + err.message);
        }
    };

    if (loading) {
        return <div className="loading-spinner">Cargando categorías...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="categorias-list">
            <h2>Listado de Categorías</h2>
            <Button
                onClick={onReturn}
                className="btn-primary"
                icon={<FaArrowLeft />}
            >
                Volver al Registro
            </Button>

            {categorias.length === 0 ? (
                <div className="empty-state">
                    <p>No hay categorías registradas.</p>
                    <Button
                        onClick={onReturn}
                        className="btn-primary"
                        icon={<FaPlus />}
                    >
                        Registrar Categoría
                    </Button>
                </div>
            ) : (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.idCategoria}>
                                    <td>{categoria.descripcion}</td>
                                    <td>
                                        <span className={`status-badge ${categoria.estado === 1 ? 'status-active' : 'status-inactive'}`}>
                                            {categoria.estado === 1 ? "Activo" : "Desactivado"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <Button
                                                onClick={() => onEdit(categoria.idCategoria)}
                                                className="btn-edit"
                                                icon={<FaEdit />}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                onClick={() => openDeleteModal(categoria.idCategoria)}
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
                message="¿Está seguro que desea eliminar esta categoría? Esta acción no se puede deshacer y podría afectar a los productos asociados."
                confirmButtonText="Eliminar"
                cancelButtonText="Cancelar"
                type="danger"
            />
        </div>
    );
}

export default CategoriasList;