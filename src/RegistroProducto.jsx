import React, { useState, useEffect } from 'react';

function RegistroProducto({ onViewChange }) {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        codigoBarras: "",
        precioVenta: "",
        cantidadStock: "",
        estado: "",
        categoria: {
            idCategoria: ""
        }
    });

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/categoria')
            .then(response => response.json())
            .then(data => {
                setCategorias(data);
                console.log(data);
            })
            .catch(error => console.error('Error al cargar categorías:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "categoria") {
            setNuevoProducto(prev => ({
                ...prev,
                categoria: { idCategoria: parseInt(value) } 
            }));
        } else {
            setNuevoProducto(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const agregarProducto = () => {
        const { nombre, codigoBarras, precioVenta, cantidadStock, estado, categoria } = nuevoProducto;
        if (nombre && codigoBarras && precioVenta && cantidadStock && estado && categoria.idCategoria) {
            const productoParaAgregar = {
                nombre,
                codigoBarras,
                precioVenta: parseFloat(precioVenta), 
                cantidadStock: parseInt(cantidadStock), 
                estado: parseInt(estado), 
                categoria: {
                    idCategoria: categoria.idCategoria 
                }
            };
            console.log('Producto para agregar:', productoParaAgregar);

            fetch('http://localhost:8080/api/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoParaAgregar)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Producto añadido con éxito:', data);
                    setNuevoProducto({
                        nombre: "",
                        codigoBarras: "",
                        precioVenta: "",
                        cantidadStock: "",
                        estado: "",
                        categoria: {
                            idCategoria: ""
                        }
                    });
                    const event = new CustomEvent('productoAgregado', { detail: productoParaAgregar });
                    window.dispatchEvent(event);
                    alert('Producto añadido con éxito');
                })
                .catch(error => {
                    console.error('Error al añadir el producto:', error);
                    alert('Ocurrió un error al agregar el producto. Por favor, intente de nuevo.');
                });
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    };

    return (
        <div className="registro-producto">
            <h2>Registro de Productos</h2>
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
                <label htmlFor="codigoBarras">Código de Barras</label>
                <input
                    id="codigoBarras"
                    type="text"
                    name="codigoBarras"
                    value={nuevoProducto.codigoBarras}
                    onChange={handleInputChange}
                    placeholder="Ej. PRD001"
                />
            </div>
            <div className="form-group">
                <label htmlFor="precioVenta">Precio de Venta (COP)</label>
                <input
                    id="precioVenta"
                    type="number"
                    name="precioVenta"
                    value={nuevoProducto.precioVenta}
                    onChange={handleInputChange}
                    placeholder="Ej. 15.50"
                    step="0.01"
                />
            </div>
            <div className="form-group">
                <label htmlFor="cantidadStock">Cantidad Stock</label>
                <input
                    id="cantidadStock"
                    type="number"
                    name="cantidadStock"
                    value={nuevoProducto.cantidadStock}
                    onChange={handleInputChange}
                    placeholder="Ej. 100"
                />
            </div>
            <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                    id="estado"
                    name="estado"
                    value={nuevoProducto.estado} 
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione un estado</option>
                    <option value="1">Activo</option>
                    <option value="0">Desactivado</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="categoria">Categoría</label>
                <select
                    id="categoria"
                    name="categoria"
                    value={nuevoProducto.categoria.idCategoria} 
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria, index) => (
                        <option key={categoria.idCategoria || index} value={categoria.idCategoria}>
                            {categoria.descripcion}
                        </option>
                    ))}
                </select>
            </div>
            <div className="button-group">
                <button onClick={agregarProducto} className="btn btn-primary">
                    Añadir Producto
                </button>
                <button onClick={() => onViewChange('verProductos')} className="btn btn-secondary">
                    Ver Productos
                </button>
            </div>
        </div>
    );
}

export default RegistroProducto;