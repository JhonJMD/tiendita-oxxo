import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import RegistroProducto from './RegistroProducto'
import VerProductos from './VerProductos'
import RegistroCategoria from './RegistroCategoria'
import RegistroCliente from './RegistroCliente'
import RegistroCompra from './RegistroCompra'
import './styles.css'
import VerCategorias from './VerCategorias'

function TiendaOxxo() {
    const [vista, setVista] = useState("inicio")
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const handleProductoAgregado = (event) => {
            setProductos(prevProductos => [...prevProductos, event.detail])
        }

        const handleCategoriaAgregado = (event) => {
            setCategorias(prevCategorias => [...prevCategorias, event.detail])
        }

        window.addEventListener('productoAgregado', handleProductoAgregado)

        window.addEventListener('categoriaAgregado', handleCategoriaAgregado)

        return () => {
            window.removeEventListener('productoAgregado', handleProductoAgregado)

            window.removeEventListener('categoriaAgregado', handleCategoriaAgregado)
        }
    }, [])

    const handleViewChange = (newView) => {
        setVista(newView)
    }

    const renderContent = () => {
        switch (vista) {
            case "productos":
                return <RegistroProducto onViewChange={handleViewChange} />
            case "verProductos":
                return <VerProductos productos={productos} setProductos={setProductos} onViewChange={handleViewChange} />
            case "categorias":
                return <RegistroCategoria onViewChange={handleViewChange}/>
            case "verCategorias":
                return <VerCategorias categorias={categorias} setCategorias={setCategorias} onViewChange={handleViewChange} />
            case "registroCliente":
                return <RegistroCliente />
            case "registroCompra":
                return <RegistroCompra />
            default:
                return <h2>Bienvenido al sistema de gestión de OXXO</h2>
        }
    }

    return (
        <div className="tienda-oxxo">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img className="logo-text" src="./public/Asset+10OXXO.png" alt="OXXO Logo" onClick={() => setVista()}/>
                    </div>
                </div>
                <div className="yellow-bar"></div>
            </header>
            <nav className="nav">
                <button 
                    className={`nav-btn ${vista === "productos" ? 'active' : ''}`}
                    onClick={() => setVista("productos")}
                >
                    Productos
                </button>
                <button 
                    className={`nav-btn ${vista === "categorias" ? 'active' : ''}`}
                    onClick={() => setVista("categorias")}
                >
                    Categorías
                </button>
                <button 
                    className={`nav-btn ${vista === "registroCliente" ? 'active' : ''}`}
                    onClick={() => setVista("registroCliente")}
                >
                    Clientes
                </button>
                <button 
                    className={`nav-btn ${vista === "registroCompra" ? 'active' : ''}`}
                    onClick={() => setVista("registroCompra")}
                >
                    Compras
                </button>
            </nav>
            <main className="main-content">
                {renderContent()}
            </main>
            <footer className="footer">
                © 2024 OXXO. Todos los derechos reservados.
            </footer>
        </div>
    )
}

ReactDOM.render(<TiendaOxxo />, document.getElementById('root'))