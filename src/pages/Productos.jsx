import React, { useState, useEffect } from 'react';
import ProductoForm from '../components/products/ProductoForm';
import ProductosList from '../components/products/ProductosList';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LoadingOverlay from '../components/common/LoadingOverlay';
import { getProductoById } from '../api/services/productoService';
import { useAppContext } from '../context/AppContext';
import { showError } from '../utils/notifications';
import { FaBox, FaList, FaEdit } from 'react-icons/fa';

function Productos({ vista, setVista }) {
    const [productoEditando, setProductoEditando] = useState(null);
    const [loading, setLoading] = useState(false);
    const { refreshProductos } = useAppContext();

    // Si estamos en modo edición, cargar el producto
    useEffect(() => {
        const cargarProducto = async (id) => {
            try {
                setLoading(true);
                const producto = await getProductoById(id);
                setProductoEditando(producto);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
                showError('Error al cargar el producto para editar: ' + error.message);
                setVista('verProductos');
            } finally {
                setLoading(false);
            }
        };

        if (vista === 'editarProducto' && !productoEditando) {
            // Extraer el ID del producto de la URL o del estado
            const idProducto = window.location.hash.replace('#producto-', '') || null;
            if (idProducto) {
                cargarProducto(idProducto);
            } else {
                setVista('verProductos');
            }
        }
    }, [vista, productoEditando, setVista]);

    const handleSuccess = async () => {
        await refreshProductos();
        if (vista === 'editarProducto') {
            setVista('verProductos');
            setProductoEditando(null);
        }
    };

    // Configurar breadcrumbs según la vista actual
    const getBreadcrumbs = () => {
        if (vista === 'productos') {
            return [
                { label: 'Productos', icon: <FaBox />, path: 'productos' },
            ];
        } else if (vista === 'verProductos') {
            return [
                { label: 'Productos', icon: <FaBox />, path: 'productos' },
                { label: 'Lista de Productos', icon: <FaList />, path: 'verProductos' },
            ];
        } else if (vista === 'editarProducto') {
            return [
                { label: 'Productos', icon: <FaBox />, path: 'productos' },
                { label: 'Lista de Productos', icon: <FaList />, path: 'verProductos' },
                { label: 'Editar Producto', icon: <FaEdit /> },
            ];
        }
        return [];
    };

    if (loading) {
        return (
            <div className="productos-page">
                <Breadcrumbs
                    items={getBreadcrumbs()}
                    onNavigate={setVista}
                />
                <div className="loading-spinner">Cargando producto...</div>
            </div>
        );
    }

    return (
        <div className="productos-page">
            <Breadcrumbs
                items={getBreadcrumbs()}
                onNavigate={setVista}
            />

            {vista === 'productos' && (
                <ProductoForm
                    onSuccess={handleSuccess}
                    onCancel={() => setVista('verProductos')}
                />
            )}

            {vista === 'verProductos' && (
                <ProductosList
                    onEdit={(id) => {
                        setProductoEditando(null);
                        window.location.hash = `#producto-${id}`;
                        setVista('editarProducto');
                    }}
                    onReturn={() => setVista('productos')}
                />
            )}

            {vista === 'editarProducto' && productoEditando && (
                <ProductoForm
                    producto={productoEditando}
                    onSuccess={handleSuccess}
                    onCancel={() => {
                        setVista('verProductos');
                        setProductoEditando(null);
                    }}
                />
            )}
        </div>
    );
}

export default Productos;