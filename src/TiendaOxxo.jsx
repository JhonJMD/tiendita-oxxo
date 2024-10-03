import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import RegistroProducto from './RegistroProducto'
import VerProductos from './VerProductos'
import EditarProducto from './EditarProducto'
import RegistroCategoria from './RegistroCategoria'
import VerCategorias from './VerCategorias'
import EditarCategoria from './EditarCategoria'
import RegistroCliente from './RegistroCliente'
import VerClientes from './VerClientes'
import EditarCliente from './EditarCliente'
import RegistroCompra from './RegistroCompra'
import './styles.css'

function TiendaOxxo() {
    const [vista, setVista] = useState("inicio")
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [clientes, setClientes] = useState([])
    const [productoEditando, setProductoEditando] = useState(null)
    const [categoriaEditando, setCategoriaEditando] = useState(null)
    const [clienteEditando, setClienteEditando] = useState(null)

    useEffect(() => {
        const handleProductoAgregado = (event) => {
            setProductos(prevProductos => [...prevProductos, event.detail])
        }

        const handleCategoriaAgregado = (event) => {
            setCategorias(prevCategorias => [...prevCategorias, event.detail])
        }

        const handleClienteAgregado = (event) => {
            setClientes(prevClientes => [...prevClientes, event.detail])
        }

        window.addEventListener('productoAgregado', handleProductoAgregado)
        window.addEventListener('categoriaAgregado', handleCategoriaAgregado)
        window.addEventListener('clienteAgregado', handleClienteAgregado)

        return () => {
            window.removeEventListener('productoAgregado', handleProductoAgregado)
            window.removeEventListener('categoriaAgregado', handleCategoriaAgregado)
            window.removeEventListener('clientegregado', handleClienteAgregado)
        }
    }, [])

    const handleViewChange = (newView, id = null) => {
        setVista(newView)
        if (newView === 'editarProducto' && id) {
            setProductoEditando(productos.find(p => p.idProducto === id))
        } else if (newView === 'editarCategoria' && id) {
            setCategoriaEditando(categorias.find(c => c.idCategoria === id))
        } else if (newView === 'editarCliente' && id){
            setClienteEditando(clientes.find(cli => cli.id === id))
        }
    }

    const renderContent = () => {
        switch (vista) {
            case "productos":
                return <RegistroProducto onViewChange={handleViewChange} />
            case "verProductos":
                return <VerProductos productos={productos} setProductos={setProductos} onViewChange={handleViewChange} />
            case "editarProducto":
                return <EditarProducto 
                    producto={productoEditando} 
                    onViewChange={handleViewChange} 
                    setProductos={setProductos}
                    categorias={categorias}
                />
            case "categorias":
                return <RegistroCategoria onViewChange={handleViewChange}/>
            case "verCategorias":
                return <VerCategorias categorias={categorias} setCategorias={setCategorias} onViewChange={handleViewChange} />
            case "editarCategoria":
                return <EditarCategoria 
                    categoria={categoriaEditando} 
                    onViewChange={handleViewChange} 
                    setCategorias={setCategorias}
                />
            case "clientes":
                return <RegistroCliente onViewChange={handleViewChange}/>
            case "verClientes":
                return <VerClientes clientes={clientes} setClientes={setClientes} onViewChange={handleViewChange} />
            case "editarCliente":
                return <EditarCliente
                    cliente={clienteEditando} 
                    onViewChange={handleViewChange} 
                    setClientes={setClientes}
                />
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
                        <img className="logo-text" src="./public/Asset+10OXXO.png" alt="OXXO Logo" onClick={() => setVista("inicio")}/>
                    </div>
                </div>
                <div className="yellow-bar"></div>
            </header>
            <nav className="nav">
                <button 
                    className={`nav-btn ${vista === "productos" || vista === "verProductos" || vista === "editarProducto" ? 'active' : ''}`}
                    onClick={() => setVista("productos")}
                >
                    Productos
                </button>
                <button 
                    className={`nav-btn ${vista === "categorias" || vista === "verCategorias" || vista === "editarCategoria" ? 'active' : ''}`}
                    onClick={() => setVista("categorias")}
                >
                    Categorías
                </button>
                <button 
                    className={`nav-btn ${vista === "clientes" || vista === "verClientes" || vista === "editarCliente" ? 'active' : ''}`}
                    onClick={() => setVista("clientes")}
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