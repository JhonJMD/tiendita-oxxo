import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function RegistroProducto() {
    const [nuevoProducto, setNuevoProducto] = useState({
        codigo: "",
        nombre: "",
        precio: 0,
        stock: 0,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNuevoProducto((prev) => ({
            ...prev,
            [name]: name === "precio" || name === "stock" ? Number(value) : value,
        }))
    }

    const agregarProducto = () => {
        if (nuevoProducto.codigo && nuevoProducto.nombre && nuevoProducto.precio > 0 && nuevoProducto.stock >= 0) {
            const event = new CustomEvent('productoAgregado', { detail: nuevoProducto })
            window.dispatchEvent(event)
            setNuevoProducto({ codigo: "", nombre: "", precio: 0, stock: 0 })
        } else {
            alert("Por favor, complete todos los campos correctamente.")
        }
    }

    return (
        <div className="space-y-4 bg-white p-6 rounded-lg text-black">
            <h2 className="text-2xl font-bold mb-4 text-[#ED1C24]">Registro de Productos</h2>
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="codigo">Código</Label>
                    <Input
                        id="codigo"
                        type="text"
                        name="codigo"
                        value={nuevoProducto.codigo}
                        onChange={handleInputChange}
                        placeholder="Ej. PRD001"
                    />
                </div>
                <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={nuevoProducto.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej. Refresco Cola"
                    />
                </div>
                <div>
                    <Label htmlFor="precio">Precio (MXN)</Label>
                    <Input
                        id="precio"
                        type="number"
                        name="precio"
                        value={nuevoProducto.precio || ""}
                        onChange={handleInputChange}
                        placeholder="Ej. 15.50"
                        step="0.01"
                    />
                </div>
                <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                        id="stock"
                        type="number"
                        name="stock"
                        value={nuevoProducto.stock || ""}
                        onChange={handleInputChange}
                        placeholder="Ej. 100"
                    />
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <Button onClick={agregarProducto} className="bg-[#ED1C24] hover:bg-[#C1151B] text-white">
                    Añadir Producto
                </Button>
                <Button onClick={() => window.dispatchEvent(new Event('verProductos'))} variant="outline" className="text-[#ED1C24]">
                    Ver Productos
                </Button>
            </div>
        </div>
    )
}

class RegistroProductoComponent extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<RegistroProducto />, this)
    }
}

customElements.define('registro-producto', RegistroProductoComponent)