import React, { useState } from 'react'

function RegistroProducto() {
    const [nuevoProducto, setNuevoProducto] = useState({
        codigo: "",
        nombre: "",
        precio: "",
        stock: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNuevoProducto(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const agregarProducto = () => {
        if (nuevoProducto.codigo && nuevoProducto.nombre && nuevoProducto.precio && nuevoProducto.stock) {
            const productoParaAgregar = {
                ...nuevoProducto,
                precio: parseFloat(nuevoProducto.precio),
                stock: parseInt(nuevoProducto.stock)
            }
            const event = new CustomEvent('productoAgregado', { detail: productoParaAgregar })
            window.dispatchEvent(event)
            setNuevoProducto({ codigo: "", nombre: "", precio: "", stock: "" })
        } else {
            alert("Por favor, complete todos los campos correctamente.")
        }
    }

    return (
        <div className="registro-producto">
            <h2>Registro de Productos</h2>
            <div className="form-group">
                <label htmlFor="codigo">Código</label>
                <input
                    id="codigo"
                    type="text"
                    name="codigo"
                    value={nuevoProducto.codigo}
                    onChange={handleInputChange}
                    placeholder="Ej. PRD001"
                />
            </div>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={nuevoProducto.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej. Refresco Cola"
                />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio (MXN)</label>
                <input
                    id="precio"
                    type="number"
                    name="precio"
                    value={nuevoProducto.precio}
                    onChange={handleInputChange}
                    placeholder="Ej. 15.50"
                    step="0.01"
                />
            </div>
            <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                    id="stock"
                    type="number"
                    name="stock"
                    value={nuevoProducto.stock}
                    onChange={handleInputChange}
                    placeholder="Ej. 100"
                />
            </div>
            <div className="button-group">
                <button onClick={agregarProducto} className="btn btn-primary">
                    Añadir Producto
                </button>
                <button onClick={() => window.dispatchEvent(new Event('verProductos'))} className="btn btn-secondary">
                    Ver Productos
                </button>
            </div>
        </div>
    )
}

export default RegistroProducto