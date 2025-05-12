import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCategorias } from '../api/services/categoriaService';
import { getProductos } from '../api/services/productoService';
import { getClientes } from '../api/services/clienteService';
import { showError } from '../utils/notifications';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [categoriasData, productosData, clientesData] = await Promise.all([
                    getCategorias(),
                    getProductos(),
                    getClientes()
                ]);

                setCategorias(categoriasData);
                setProductos(productosData);
                setClientes(clientesData);
                setError(null);
            } catch (err) {
                console.error('Error al cargar datos iniciales:', err);
                setError('Error al cargar datos. Por favor, recargue la página.');
                showError('Error al cargar datos iniciales. Por favor, recargue la página.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const refreshCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(data);
            return data;
        } catch (err) {
            console.error('Error al actualizar categorías:', err);
            showError('Error al actualizar categorías: ' + err.message);
            throw err;
        }
    };

    const refreshProductos = async () => {
        try {
            const data = await getProductos();
            setProductos(data);
            return data;
        } catch (err) {
            console.error('Error al actualizar productos:', err);
            showError('Error al actualizar productos: ' + err.message);
            throw err;
        }
    };

    const refreshClientes = async () => {
        try {
            const data = await getClientes();
            setClientes(data);
            return data;
        } catch (err) {
            console.error('Error al actualizar clientes:', err);
            showError('Error al actualizar clientes: ' + err.message);
            throw err;
        }
    };

    return (
        <AppContext.Provider value={{
            categorias,
            setCategorias,
            productos,
            setProductos,
            clientes,
            setClientes,
            loading,
            error,
            refreshCategorias,
            refreshProductos,
            refreshClientes
        }}>
            {children}
        </AppContext.Provider>
    );
};