import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

function VerProductos() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const handleProductoAgregado = (event) => {
            setProductos((prev) => [...prev, event.detail])
        }

        window.addEventListener('productoAgregado', handleProductoAgregado)

        return () => {
            window.removeEventListener('productoAgregado', handleProductoAgregado)
        }
    }, [])

    const eliminarProducto = (codigo) => {
        setProductos((prev) => prev.filter((producto) => producto.codigo !== codigo))
    }

    return (
        <div className="bg-white p-6 rounded-lg text-black">
            <h2 className="text-2xl font-bold mb-4 text-[#ED1C24]">Listado de Productos</h2>
            <Button
                onClick={() => window.dispatchEvent(new Event('volverARegistro'))}
                className="mb-4 bg-[#ED1C24] hover:bg-[#C1151B] text-white"
            >
                Volver al Registro
            </Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio (MXN)</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productos.map((producto) => (
                        <TableRow key={producto.codigo}>
                            <TableCell>{producto.codigo}</TableCell>
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>${producto.precio.toFixed(2)}</TableCell>
                            <TableCell>{producto.stock}</TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => eliminarProducto(producto.codigo)}
                                    className="text-[#ED1C24] hover:bg-[#FFCCCF]"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

class VerProductosComponent extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<VerProductos />, this)
    }
}

customElements.define('ver-productos', VerProductosComponent)