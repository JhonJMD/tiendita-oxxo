import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './RegistroProducto.jsx'
import './VerProductos.jsx'

function TiendaOxxo() {
    const [vista, setVista] = useState("registro")

    useEffect(() => {
        const handleVerProductos = () => setVista("listado")
        const handleVolverARegistro = () => setVista("registro")

        window.addEventListener('verProductos', handleVerProductos)
        window.addEventListener('volverARegistro', handleVolverARegistro)

        return () => {
            window.removeEventListener('verProductos', handleVerProductos)
            window.removeEventListener('volverARegistro', handleVolverARegistro)
        }
    }, [])

    return (
        <div className="container mx-auto p-4 bg-[#ED1C24] min-h-screen text-white">
            <header className="bg-white text-[#ED1C24] p-4 rounded-lg mb-6">
                <h1 className="text-4xl font-bold text-center">Tienda Oxxo</h1>
            </header>
            {vista === "registro" ? <registro-producto></registro-producto> : <ver-productos></ver-productos>}
        </div>
    )
}

ReactDOM.render(<TiendaOxxo />, document.getElementById('root'))