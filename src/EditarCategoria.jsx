import React, { useState, useEffect } from 'react';

function EditarCategoria({ categoria, onViewChange, setCategorias }) {
    const [categoriaEditado, setCategoriaEditado] = useState(categoria);

    useEffect(() => {
        // Cargar categorías
        fetch('http://localhost:8080/api/categoria')
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error al cargar categorías:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoriaEditado(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar datos actualizados a la API
        fetch(`http://localhost:8080/api/categoria/${categoriaEditado.idCategoria}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoriaEditado)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Categoria actualizado:', data);
            // Actualizar la lista de productos
            setCategorias(prevCategorias => 
                prevCategorias.map(p => p.idCategoria === data.idCategoria ? data : p)
            );
            onViewChange('verCategorias');
        })
        .catch(error => console.error('Error al actualizar el categoria:', error));
    };

    return (
        <div className="editar-categoria">
            <h2>Editar Categoria</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="descripcion">Nombre</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={categoriaEditado.descripcion}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <select
                        id="estado"
                        name="estado"
                        value={categoriaEditado.estado}
                        onChange={handleInputChange}
                        required
                    >
                        <option value={1}>Activo</option>
                        <option value={0}>Desactivo</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                <button type="button" className="btn btn-secondary" onClick={() => onViewChange('verCategorias')}>Cancelar</button>
            </form>
        </div>
    );
}

export default EditarCategoria;