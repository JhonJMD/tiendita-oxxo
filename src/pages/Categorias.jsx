import React, { useState, useEffect } from 'react';
import CategoriaForm from '../components/categories/CategoriaForm';
import CategoriasList from '../components/categories/CategoriasList';
import { getCategoriaById } from '../api/services/categoriaService';
import { useAppContext } from '../context/AppContext';

function Categorias({ vista, setVista }) {
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [loading, setLoading] = useState(false);
    const { refreshCategorias } = useAppContext();

    // Si estamos en modo edición, cargar la categoría
    useEffect(() => {
        const cargarCategoria = async (id) => {
            try {
                setLoading(true);
                const categoria = await getCategoriaById(id);
                setCategoriaEditando(categoria);
            } catch (error) {
                console.error('Error al cargar la categoría:', error);
                alert('Error al cargar la categoría para editar');
                setVista('verCategorias');
            } finally {
                setLoading(false);
            }
        };

        if (vista === 'editarCategoria' && !categoriaEditando) {
            // Extraer el ID de la categoría de la URL o del estado
            const idCategoria = window.location.hash.replace('#categoria-', '') || null;
            if (idCategoria) {
                cargarCategoria(idCategoria);
            } else {
                setVista('verCategorias');
            }
        }
    }, [vista, categoriaEditando, setVista]);

    const handleSuccess = async () => {
        await refreshCategorias();
        if (vista === 'editarCategoria') {
            setVista('verCategorias');
            setCategoriaEditando(null);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    // Renderizar el componente adecuado según la vista
    if (vista === 'categorias') {
        return (
            <CategoriaForm
                onSuccess={handleSuccess}
                onCancel={() => setVista('verCategorias')}
            />
        );
    }

    if (vista === 'verCategorias') {
        return (
            <CategoriasList
                onEdit={(id) => {
                    setCategoriaEditando(null); // Limpiar el estado antes de editar
                    window.location.hash = `#categoria-${id}`;
                    setVista('editarCategoria');
                }}
                onReturn={() => setVista('categorias')}
            />
        );
    }

    if (vista === 'editarCategoria' && categoriaEditando) {
        return (
            <CategoriaForm
                categoria={categoriaEditando}
                onSuccess={handleSuccess}
                onCancel={() => {
                    setVista('verCategorias');
                    setCategoriaEditando(null);
                }}
            />
        );
    }

    return <div>Cargando...</div>;
}

export default Categorias;