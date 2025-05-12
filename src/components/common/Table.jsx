import React from 'react';

function Table({ columns, data, onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.header}</th>
                    ))}
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id || item.idProducto || item.idCategoria}>
                        {columns.map((column) => (
                            <td key={`${item.id || item.idProducto || item.idCategoria}-${column.key}`}>
                                {column.render ? column.render(item) : item[column.key]}
                            </td>
                        ))}
                        <td>
                            <button
                                onClick={() => onEdit(item.id || item.idProducto || item.idCategoria)}
                                className="btn btn-edit"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(item.id || item.idProducto || item.idCategoria)}
                                className="btn btn-delete"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;