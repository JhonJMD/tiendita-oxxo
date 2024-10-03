import React, { useState } from 'react';

function RegistroCliente({ onViewChange }) {
    const [nuevoCliente, setNuevoCliente] = useState({
        id: "",
        nombre: "",
        apellido: "",
        celular: "",
        direccion: "",
        correoElectronico: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoCliente(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const agregarCliente = () => {
        const { id, nombre, apellido, celular, direccion, correoElectronico } = nuevoCliente;
        if (id && nombre && apellido && celular && direccion && correoElectronico) {
            const clienteParaAgregar = {
                id,
                nombre,
                apellido,
                celular: parseInt(celular),
                direccion,
                correoElectronico
            };
            console.log('Cliente para agregar:', clienteParaAgregar);

            // Enviar datos a la API utilizando fetch
            fetch('http://localhost:8080/api/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteParaAgregar)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Cliente añadido con éxito:', data);
                    // Resetea el formulario
                    setNuevoCliente({
                        id: "",
                        nombre: "",
                        apellido: "",
                        celular: "",
                        direccion: "",
                        correoElectronico: ""
                    });
                    const event = new CustomEvent('clienteAgregado', { detail: clienteParaAgregar });
                    window.dispatchEvent(event);
                    alert('Cliente añadido con éxito');
                })
                .catch(error => {
                    console.error('Error al añadir el cliente:', error);
                    alert('Ocurrió un error al agregar el cliente. Por favor, intente de nuevo.');
                });
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    };

    return (
        <div className="registro-clientes">
            <h2>Registro de Clientes</h2>
            <div className="form-group">
                <label htmlFor="id">Cedula</label>
                <input
                    id="id"
                    type="text"
                    name="id"
                    value={nuevoCliente.id}
                    onChange={handleInputChange}
                    placeholder="Ej. 1311887ASDQ11874"
                />
            </div>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={nuevoCliente.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                />
            </div>
            <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                    id="apellido"
                    type="text"
                    name="apellido"
                    value={nuevoCliente.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido"
                />
            </div>
            <div className="form-group">
                <label htmlFor="celular">Celular</label>
                <input
                    id="celular"
                    type="number"
                    name="celular"
                    value={nuevoCliente.celular}
                    onChange={handleInputChange}
                    placeholder="Ej. 3124198288"
                />
            </div>
            <div className="form-group">
                <label htmlFor="direccion">Direccion</label>
                <input
                    id="direccion"
                    type="text"
                    name="direccion"
                    value={nuevoCliente.direccion}
                    onChange={handleInputChange}
                    placeholder="Ej. Cra 2W #16G"
                />
            </div>
            <div className="form-group">
                <label htmlFor="correoElectronico">Correo Electronico</label>
                <input
                    id="correoElectronico"
                    type="text"
                    name="correoElectronico"
                    value={nuevoCliente.correoElectronico}
                    onChange={handleInputChange}
                    placeholder="Ej. usuario@gmail.com"
                />
            </div>
            <div className="button-group">
                <button onClick={agregarCliente} className="btn btn-primary">
                    Añadir Cliente
                </button>
                <button onClick={() => onViewChange('verClientes')} className="btn btn-secondary">
                    Ver Clientes
                </button>
            </div>
        </div>
    );
}

export default RegistroCliente;