import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import RegistroProducto from './RegistroProducto'
import VerProductos from './VerProductos'
import './styles.css'

function TiendaOxxo() {
    const [vista, setVista] = useState("registro")
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const handleVerProductos = () => setVista("listado")
        const handleVolverARegistro = () => setVista("registro")
        const handleProductoAgregado = (event) => {
            setProductos(prevProductos => [...prevProductos, event.detail])
        }

        window.addEventListener('verProductos', handleVerProductos)
        window.addEventListener('volverARegistro', handleVolverARegistro)
        window.addEventListener('productoAgregado', handleProductoAgregado)

        return () => {
            window.removeEventListener('verProductos', handleVerProductos)
            window.removeEventListener('volverARegistro', handleVolverARegistro)
            window.removeEventListener('productoAgregado', handleProductoAgregado)
        }
    }, [])

    return (
        <div className="tienda-oxxo">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img className="logo-text"  src="./public/Asset+10OXXO.png"/>
                        <div className="logo-circle"></div>
                    </div>
                    <div className="yellow-bar"></div>
                </div>
            </header>
            <div className='nav'>

            </div>
            <main className="main-content">
                {vista === "registro"
                    ? <RegistroProducto />
                    : <VerProductos productos={productos} setProductos={setProductos} />
                }
            </main>
            <footer className="footer">
                © 2024 OXXO. Todos los derechos reservados.
            </footer>
        </div>
    )
}

ReactDOM.render(<TiendaOxxo />, document.getElementById('root'))