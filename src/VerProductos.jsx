import React, { useEffect } from 'react';

function VerProductos({ productos, setProductos, onViewChange }) {
    // Cargar productos desde la API
    useEffect(() => {
        fetch('http://localhost:8080/api/producto')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los productos');
                }
                return response.json();
            })
            .then(data => setProductos(data))
            .catch(error => console.error('Error al cargar productos:', error));
    }, [setProductos]);

    const eliminarProducto = (idProducto) => {
        // Eliminar producto de la API
        fetch(`http://localhost:8080/api/producto/${idProducto}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Si la eliminación en la API fue exitosa, actualizar el estado local
                    setProductos(prevProductos => prevProductos.filter(producto => producto.idProducto !== idProducto));
                    console.log(`Producto con ID ${idProducto} eliminado con éxito`);
                } else {
                    console.error(`Error en la API al eliminar el producto con ID ${idProducto}: `, response.status);
                }
            })
            .catch(error => console.error('Error al eliminar el producto:', error));
    };

    const editarProducto = (idProducto) => {
        // Aquí implementaremos la lógica para editar el producto
        console.log(`Editando producto con ID ${idProducto}`);
        // Por ahora, simplemente cambiamos la vista al formulario de edición
        onViewChange('editarProducto', idProducto);
    };

    return (
        <div className="ver-productos">
            <h2>Listado de Productos</h2>
            <button
                onClick={() => onViewChange('productos')}
                className="btn btn-primary"
            >
                Volver al Registro
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Código de Barras</th>
                        <th>Nombre</th>
                        <th>Precio (COP)</th>
                        <th>Stock</th>
                        <th>Categoria</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.idProducto}>
                            <td>{producto.codigoBarras}</td>
                            <td>{producto.nombre}</td>
                            <td>${producto.precioVenta.toFixed(2)}</td>
                            <td>{producto.cantidadStock}</td>
                            <td>{producto.categoria.descripcion}</td>
                            <td>{producto.estado === 1 ? "Activo" : "Desactivo"}</td>
                            <td>
                                <button
                                    onClick={() => editarProducto(producto.idProducto)}
                                    className="btn btn-edit"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarProducto(producto.idProducto)}
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

export default VerProductos;
