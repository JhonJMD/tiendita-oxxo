import React, { useEffect } from 'react';

function VerClientes({ clientes, setClientes, onViewChange }) {
    // Cargar clientes desde la API
    useEffect(() => {
        fetch('http://localhost:8080/api/cliente')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los clientes');
                }
                return response.json();
            })
            .then(data => setClientes(data))
            .catch(error => console.error('Error al cargar clientes:', error));
    }, [setClientes]);

    const eliminarCliente = (id) => {
        // Eliminar cliente de la API
        fetch(`http://localhost:8080/api/cliente/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Si la eliminación en la API fue exitosa, actualizar el estado local
                    setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
                    console.log(`Cliente con ID ${id} eliminado con éxito`);
                } else {
                    console.error(`Error en la API al eliminar el cliente con ID ${id}: `, response.status);
                }
            })
            .catch(error => console.error('Error al eliminar el cliente:', error));
    };

    const editarCliente = (id) => {
        // Aquí implementaremos la lógica para editar el cliente
        console.log(`Editando cliente con ID ${id}`);
        // Por ahora, simplemente cambiamos la vista al formulario de edición
        onViewChange('editarCliente', id);
    };

    return (
        <div className="ver-clientes">
            <h2>Listado de Clientes</h2>
            <button
                onClick={() => onViewChange('clientes')}
                className="btn btn-primary"
            >
                Volver al Registro
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Celular</th>
                        <th>Direccion</th>
                        <th>Correo Electronico</th>
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
                                <button
                                    onClick={() => editarCliente(cliente.id)}
                                    className="btn btn-edit"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarCliente(cliente.id)}
                                    className="btn btn-delete"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VerClientes;