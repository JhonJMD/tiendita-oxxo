import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import ConfirmationModal from '../common/ConfirmationModal';
import { getClientes, deleteCliente } from '../../api/services/clienteService';
import { showSuccess, showError } from '../../utils/notifications';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';

function ClientesList({ onEdit, onReturn }) {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClienteId, setSelectedClienteId] = useState(null);

    useEffect(() => {
        const loadClientes = async () => {
            try {
                setLoading(true);
                const data = await getClientes();
                setClientes(data);
            } catch (err) {
                setError('Error al cargar los clientes: ' + err.message);
                showError('Error al cargar los clientes: ' + err.message);
                console.error('Error al cargar clientes:', err);
            } finally {
                setLoading(false);
            }
        };

        loadClientes();
    }, []);

    const openDeleteModal = (id) => {
        setSelectedClienteId(id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedClienteId(null);
    };

    const handleDelete = async () => {
        if (!selectedClienteId) return;

        try {
            await deleteCliente(selectedClienteId);
            setClientes(clientes.filter(cli => cli.id !== selectedClienteId));
            showSuccess('Cliente eliminado con éxito');
        } catch (err) {
            showError('Error al eliminar el cliente: ' + err.message);
        }
    };

    if (loading) {
        return <div className="loading-spinner">Cargando clientes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="clientes-list">
            <h2>Listado de Clientes</h2>
            <Button
                onClick={onReturn}
                className="btn-primary"
                icon={<FaArrowLeft />}
            >
                Volver al Registro
            </Button>

            {clientes.length === 0 ? (
                <div className="empty-state">
                    <p>No hay clientes registrados.</p>
                    <Button
                        onClick={onReturn}
                        className="btn-primary"
                        icon={<FaPlus />}
                    >
                        Registrar Cliente
                    </Button>
                </div>
            ) : (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Celular</th>
                                <th>Dirección</th>
                                <th>Correo Electrónico</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellido}</td>
                                    <td>{cliente.celular}</td>
                                    <td>{cliente.direccion}</td>
                                    <td>{cliente.correoElectronico}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Button
                                                onClick={() => onEdit(cliente.id)}
                                                className="btn-edit"
                                                icon={<FaEdit />}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                onClick={() => openDeleteModal(cliente.id)}
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
                message="¿Está seguro que desea eliminar este cliente? Esta acción no se puede deshacer y podría afectar a las compras asociadas."
                confirmButtonText="Eliminar"
                cancelButtonText="Cancelar"
                type="danger"
            />
        </div>
    );
}

export default ClientesList;