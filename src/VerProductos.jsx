import React from 'react'

function VerProductos({ productos, setProductos }) {
    const eliminarProducto = (codigo) => {
        setProductos(prevProductos => prevProductos.filter(producto => producto.codigo !== codigo))
    }

    return (
        <div className="ver-productos">
            <h2>Listado de Productos</h2>
            <button
                onClick={() => window.dispatchEvent(new Event('volverARegistro'))}
                className="btn btn-primary"
            >
                Volver al Registro
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio (MXN)</th>
                        <th>Stock</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.codigo}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio.toFixed(2)}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <button
                                    onClick={() => eliminarProducto(producto.codigo)}
                                    className="btn btn-delete"
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default VerProductos