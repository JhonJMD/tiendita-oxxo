import React, { useState, useEffect } from 'react';

function EditarCliente({ cliente, onViewChange, setClientes }) {
    const [clienteEditado, setClienteEditado] = useState(cliente);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClienteEditado(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar datos actualizados a la API
        fetch(`http://localhost:8080/api/cliente/${clienteEditado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteEditado)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cliente actualizado:', data);
            // Actualizar la lista de clientes
            setClientes(prevClientes => 
                prevClientes.map(cli => cli.id === data.id ? data : cli)
            );
            onViewChange('verClientes');
        })
        .catch(error => console.error('Error al actualizar el cliente:', error));
    };

    return (
        <div className="editar-cliente">
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={clienteEditado.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={clienteEditado.apellido}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="celular">Celular</label>
                    <input
                        type="number"
                        id="celular"
                        name="celular"
                        value={clienteEditado.celular}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Direccion</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={clienteEditado.direccion}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="correoElectronico">Correo Electronico</label>
                    <input
                        type="text"
                        id="correoElectronico"
                        name="correoElectronico"
                        value={clienteEditado.correoElectronico}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                <button type="button" className="btn btn-secondary" onClick={() => onViewChange('verClientes')}>Cancelar</button>
            </form>
        </div>
    );
}

export default EditarCliente;