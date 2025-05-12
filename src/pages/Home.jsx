import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { FaBox, FaTag, FaUsers, FaDollarSign, FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';
import Button from '../components/common/Button';

function Home({ setVista }) {
    const { productos, categorias, clientes, loading, error } = useAppContext();

    // Obtener estadísticas básicas
    const productosActivos = productos.filter(p => p.estado === 1).length;
    const productosInactivos = productos.filter(p => p.estado === 0).length;
    const categoriasActivas = categorias.filter(c => c.estado === 1).length;
    const totalClientes = clientes.length;

    // Cálculo de valor de inventario
    const valorInventario = productos.reduce((total, producto) => {
        return total + (producto.precioVenta * producto.cantidadStock);
    }, 0);

    // Productos con bajo stock (menos de 10 unidades)
    const productosBajoStock = productos.filter(p => p.estado === 1 && p.cantidadStock < 10).length;

    if (loading) {
        return <div className="loading-spinner">Cargando información del sistema...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="home-page">
            <h2>Bienvenido al sistema de gestión de OXXO</h2>

            <div className="dashboard">
                <div className="dashboard-card">
                    <div className="card-icon">
                        <FaBox />
                    </div>
                    <h3>Productos</h3>
                    <div className="dashboard-value">{productosActivos}</div>
                    <div className="dashboard-label">productos activos</div>
                    <div className="dashboard-substat">
                        <span>{productosInactivos}</span> productos inactivos
                    </div>
                    <div className="dashboard-substat alert">
                        <span>{productosBajoStock}</span> con bajo stock
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">
                        <FaTag />
                    </div>
                    <h3>Categorías</h3>
                    <div className="dashboard-value">{categoriasActivas}</div>
                    <div className="dashboard-label">categorías activas</div>
                    <div className="dashboard-substat">
                        <span>{categorias.length - categoriasActivas}</span> categorías inactivas
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">
                        <FaUsers />
                    </div>
                    <h3>Clientes</h3>
                    <div className="dashboard-value">{totalClientes}</div>
                    <div className="dashboard-label">clientes registrados</div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">
                        <FaDollarSign />
                    </div>
                    <h3>Inventario</h3>
                    <div className="dashboard-value">{formatCurrency(valorInventario)}</div>
                    <div className="dashboard-label">valor total</div>
                    <div className="dashboard-substat">
                        <span>{productos.reduce((acc, p) => acc + p.cantidadStock, 0)}</span> unidades totales
                    </div>
                </div>
            </div>

            {productosBajoStock > 0 && (
                <div className="dashboard-section">
                    <h3>
                        <FaExclamationTriangle className="warning-icon" />
                        Productos con bajo stock
                    </h3>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Código</th>
                                    <th>Categoría</th>
                                    <th>Stock</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos
                                    .filter(p => p.estado === 1 && p.cantidadStock < 10)
                                    .map(p => (
                                        <tr key={p.idProducto}>
                                            <td>{p.nombre}</td>
                                            <td>{p.codigoBarras}</td>
                                            <td>{p.categoria.descripcion}</td>
                                            <td className="stock-warning">{p.cantidadStock}</td>
                                            <td>{formatCurrency(p.precioVenta)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="home-info">
                <h3>Guía rápida</h3>
                <ul className="quick-guide">
                    <li>
                        <div className="guide-icon"><FaBox /></div>
                        <div className="guide-content">
                            <h4>Productos</h4>
                            <p>Gestione su inventario, añada nuevos productos y actualice precios.</p>
                            <Button
                                onClick={() => setVista('productos')}
                                className="btn-sm btn-primary"
                            >
                                Ir a Productos
                            </Button>
                        </div>
                    </li>
                    <li>
                        <div className="guide-icon"><FaTag /></div>
                        <div className="guide-content">
                            <h4>Categorías</h4>
                            <p>Organice sus productos en categorías para una mejor gestión.</p>
                            <Button
                                onClick={() => setVista('categorias')}
                                className="btn-sm btn-primary"
                            >
                                Ir a Categorías
                            </Button>
                        </div>
                    </li>
                    <li>
                        <div className="guide-icon"><FaUsers /></div>
                        <div className="guide-content">
                            <h4>Clientes</h4>
                            <p>Registre y administre la información de sus clientes.</p>
                            <Button
                                onClick={() => setVista('clientes')}
                                className="btn-sm btn-primary"
                            >
                                Ir a Clientes
                            </Button>
                        </div>
                    </li>
                    <li>
                        <div className="guide-icon"><FaShoppingCart /></div>
                        <div className="guide-content">
                            <h4>Compras</h4>
                            <p>Registre las compras de los clientes y gestione el inventario automáticamente.</p>
                            <Button
                                onClick={() => setVista('registroCompra')}
                                className="btn-sm btn-primary"
                            >
                                Ir a Compras
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Home;