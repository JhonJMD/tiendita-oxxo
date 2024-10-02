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
            .then(data => setCategorias(data))
            .catch(error => console.error('Error al cargar categorias:', error));
    }, [setCategorias]);

    const eliminarCategoria = (idCategoria) => {
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

    const editarCategoria = (idCategoria) => {
        // Aquí implementaremos la lógica para editar el producto
        console.log(`Editando categoria con ID ${idCategoria}`);
        // Por ahora, simplemente cambiamos la vista al formulario de edición
        onViewChange('editarCategoria', idCategoria);
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
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.idCategoria}>
                            <td>{categoria.descripcion}</td>
                            <td>{categoria.estado === 1 ? "Activo" : "Desactivo"}</td>
                            <td>
                            <button
                                    onClick={() => editarCategoria(categoria.idCategoria)}
                                    className="btn btn-edit"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => eliminarCategoria(categoria.idCategoria)}
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

export default VerCategorias;