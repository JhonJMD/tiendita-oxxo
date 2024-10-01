import React, { useState } from 'react';
import VerProductos from './VerProductos'

function RegistroCompra() {
    const [nuevaCategoria, setNuevaCategoria] = useState({
        descripcion: "",
        estado: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaCategoria(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const agregarCategoria = () => {
        const { descripcion, estado } = nuevaCategoria;
        if (descripcion && estado) {
            const categoriaParaAgregar = {
                descripcion,
                estado: parseInt(estado)
            };
            console.log('Categoria para agregar:', categoriaParaAgregar);

            // Enviar datos a la API utilizando fetch
            fetch('http://localhost:8080/api/categoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoriaParaAgregar)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Categoria añadido con éxito:', data);
                    // Resetea el formulario
                    setNuevaCategoria({
                        descripcion: "",
                        estado: ""
                    });
                    const event = new CustomEvent('categoriaAgregado', { detail: categoriaParaAgregar });
                    window.dispatchEvent(event);
                    alert('Categoria añadido con éxito');
                })
                .catch(error => {
                    console.error('Error al añadir el categoria:', error);
                    alert('Ocurrió un error al agregar el categoria. Por favor, intente de nuevo.');
                });
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    };

    return (
        <div className="registro-categorias">
            <h2>Registro de Categorias</h2>
            <div className="form-group">
                <label htmlFor="descripcion">Descripcion</label>
                <input
                    id="descripcion"
                    type="text"
                    name="descripcion"
                    value={nuevaCategoria.descripcion}
                    onChange={handleInputChange}
                    placeholder="Ej. Refrescos"
                />
            </div>
            <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                    id="estado"
                    name="estado"
                    value={nuevaCategoria.estado} 
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione un estado</option>
                    <option value="1">Activo</option>
                    <option value="0">Desactivado</option>
                </select>
            </div>
            <div className="button-group">
                <button onClick={agregarCategoria} className="btn btn-primary">
                    Añadir Categoria
                </button>
                <button onClick={() => window.dispatchEvent(new Event('verProductos'))} className="btn btn-secondary">
                    Ver Productos
                </button>
            </div>
        </div>
    );
}

export default RegistroCompra;