import React, { useState, useEffect } from 'react';
import ClienteForm from '../components/clients/ClienteForm';
import ClientesList from '../components/clients/ClientesList';
import { getClienteById } from '../api/services/clienteService';
import { useAppContext } from '../context/AppContext';

function Clientes({ vista, setVista }) {
    const [clienteEditando, setClienteEditando] = useState(null);
    const [loading, setLoading] = useState(false);
    const { refreshClientes } = useAppContext();

    // Si estamos en modo edición, cargar el cliente
    useEffect(() => {
        const cargarCliente = async (id) => {
            try {
                setLoading(true);
                const cliente = await getClienteById(id);
                setClienteEditando(cliente);
            } catch (error) {
                console.error('Error al cargar el cliente:', error);
                alert('Error al cargar el cliente para editar');
                setVista('verClientes');
            } finally {
                setLoading(false);
            }
        };

        if (vista === 'editarCliente' && !clienteEditando) {
            // Extraer el ID del cliente de la URL o del estado
            const idCliente = window.location.hash.replace('#cliente-', '') || null;
            if (idCliente) {
                cargarCliente(idCliente);
            } else {
                setVista('verClientes');
            }
        }
    }, [vista, clienteEditando, setVista]);

    const handleSuccess = async () => {
        await refreshClientes();
        if (vista === 'editarCliente') {
            setVista('verClientes');
            setClienteEditando(null);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    // Renderizar el componente adecuado según la vista
    if (vista === 'clientes') {
        return (
            <ClienteForm
                onSuccess={handleSuccess}
                onCancel={() => setVista('verClientes')}
            />
        );
    }

    if (vista === 'verClientes') {
        return (
            <ClientesList
                onEdit={(id) => {
                    setClienteEditando(null); // Limpiar el estado antes de editar
                    window.location.hash = `#cliente-${id}`;
                    setVista('editarCliente');
                }}
                onReturn={() => setVista('clientes')}
            />
        );
    }

    if (vista === 'editarCliente' && clienteEditando) {
        return (
            <ClienteForm
                cliente={clienteEditando}
                onSuccess={handleSuccess}
                onCancel={() => {
                    setVista('verClientes');
                    setClienteEditando(null);
                }}
            />
        );
    }

    return <div>Cargando...</div>;
}

export default Clientes;