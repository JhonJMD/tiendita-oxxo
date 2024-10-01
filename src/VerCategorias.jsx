import React, { useEffect } from 'react';

function VerCategorias({ categorias, setCategorias, onViewChange }) {
    // Cargar productos desde la API
    useEffect(() => {
        fetch('http://localhost:8080/api/categoria')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los categorias');
                }
                return response.json();
            })
            .then(data => setProductos(data))
            .catch(error => console.error('Error al cargar categorias:', error));
    }, [setCategorias]);

    const eliminarProducto = (idCategoria) => {
        // Eliminar producto de la API
        fetch(`http://localhost:8080/api/categoria/${idCategoria}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Si la eliminación en la API fue exitosa, actualizar el estado local
                    setCategorias(prevCategorias => prevCategorias.filter(categoria => categoria.idCategoria !== idCategoria));
                    console.log(`Categoria con ID ${idCategoria} eliminado con éxito`);
                } else {
                    console.error(`Error en la API al eliminar el categoria con ID ${idCategoria}: `, response.status);
                }
            })
            .catch(error => console.error('Error al eliminar el categoria:', error));
    };

    return (
        <div className="ver-categorias">
            <h2>Listado de Categorias</h2>
            <button
                onClick={() => onViewChange('categorias')}
                className="btn btn-primary"
            >
                Volver al Registro
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.idCategoria}>
                            <td>{categoria.descripcion}</td>
                            <td>{categoria.estado}</td>
                            <td>
                                <button
                                    onClick={() => eliminarProducto(categoria.idCategoria)}
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
    );
}

export default VerCategorias;