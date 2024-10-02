import React, { useState, useEffect } from 'react';

function EditarProducto({ producto, onViewChange, setProductos }) {
    const [productoEditado, setProductoEditado] = useState(producto);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        // Cargar categorías
        fetch('http://localhost:8080/api/categoria')
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error al cargar categorías:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "categoria") {
            setProductoEditado(prev => ({
                ...prev,
                categoria: { idCategoria: parseInt(value) }
            }));
        } else {
            setProductoEditado(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar datos actualizados a la API
        fetch(`http://localhost:8080/api/producto/${productoEditado.idProducto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productoEditado)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Producto actualizado:', data);
            // Actualizar la lista de productos
            setProductos(prevProductos => 
                prevProductos.map(p => p.idProducto === data.idProducto ? data : p)
            );
            onViewChange('verProductos');
        })
        .catch(error => console.error('Error al actualizar el producto:', error));
    };

    return (
        <div className="editar-producto">
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={productoEditado.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="codigoBarras">Código de Barras</label>
                    <input
                        type="text"
                        id="codigoBarras"
                        name="codigoBarras"
                        value={productoEditado.codigoBarras}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="precioVenta">Precio de Venta (COP)</label>
                    <input
                        type="number"
                        id="precioVenta"
                        name="precioVenta"
                        value={productoEditado.precioVenta}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cantidadStock">Cantidad en Stock</label>
                    <input
                        type="number"
                        id="cantidadStock"
                        name="cantidadStock"
                        value={productoEditado.cantidadStock}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        name="categoria"
                        value={productoEditado.categoria.idCategoria}
                        onChange={handleInputChange}
                        required
                    >
                        {categorias.map(cat => (
                            <option key={cat.idCategoria} value={cat.idCategoria}>
                                {cat.descripcion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <select
                        id="estado"
                        name="estado"
                        value={productoEditado.estado}
                        onChange={handleInputChange}
                        required
                    >
                        <option value={1}>Activo</option>
                        <option value={0}>Desactivo</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                <button type="button" className="btn btn-secondary" onClick={() => onViewChange('verProductos')}>Cancelar</button>
            </form>
        </div>
    );
}

export default EditarProducto;