import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Categorias from './pages/Categorias';
import Clientes from './pages/Clientes';
import Compras from './pages/Compras';
import Modal from 'react-modal';
import './styles/global.css';

// Asegurar que Modal se monte en el elemento raíz
Modal.setAppElement('#root');

function App() {
    const [vista, setVista] = useState("inicio");

    const renderContent = () => {
        switch (vista) {
            case "productos":
            case "verProductos":
            case "editarProducto":
                return <Productos vista={vista} setVista={setVista} />;
            case "categorias":
            case "verCategorias":
            case "editarCategoria":
                return <Categorias vista={vista} setVista={setVista} />;
            case "clientes":
            case "verClientes":
            case "editarCliente":
                return <Clientes vista={vista} setVista={setVista} />;
            case "registroCompra":
                return <Compras />;
            default:
                return <Home setVista={setVista} />;
        }
    };

    return (
        <AppProvider>
            <div className="tienda-oxxo">
                <Header setVista={setVista} />
                <Navbar vista={vista} setVista={setVista} />
                <main className="main-content">
                    {renderContent()}
                </main>
                <Footer />
            </div>
        </AppProvider>
    );
}

export default App;