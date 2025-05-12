import React from 'react';
import { FaBox, FaTag, FaUsers, FaShoppingCart } from 'react-icons/fa';

function Navbar({ vista, setVista }) {
    const navItems = [
        { id: 'productos', label: 'Productos', active: ['productos', 'verProductos', 'editarProducto'], icon: <FaBox /> },
        { id: 'categorias', label: 'Categorías', active: ['categorias', 'verCategorias', 'editarCategoria'], icon: <FaTag /> },
        { id: 'clientes', label: 'Clientes', active: ['clientes', 'verClientes', 'editarCliente'], icon: <FaUsers /> },
        { id: 'registroCompra', label: 'Compras', active: ['registroCompra'], icon: <FaShoppingCart /> },
    ];

    return (
        <nav className="nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-btn ${item.active.includes(vista) ? 'active' : ''}`}
                    onClick={() => setVista(item.id)}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
}

export default Navbar;