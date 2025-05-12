import { API_BASE_URL, defaultOptions } from '../config';

export const getCompras = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/compra`);
        if (!response.ok) throw new Error('Error al cargar compras');
        return await response.json();
    } catch (error) {
        console.error('Error en getCompras:', error);
        throw error;
    }
};

export const getCompraById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/compra/${id}`);
        if (!response.ok) throw new Error(`Error al cargar compra con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en getCompraById:', error);
        throw error;
    }
};

export const createCompra = async (compra) => {
    try {
        const response = await fetch(`${API_BASE_URL}/compra`, {
            method: 'POST',
            ...defaultOptions,
            body: JSON.stringify(compra),
        });
        if (!response.ok) throw new Error('Error al crear compra');
        return await response.json();
    } catch (error) {
        console.error('Error en createCompra:', error);
        throw error;
    }
};

export const updateCompra = async (id, compra) => {
    try {
        const response = await fetch(`${API_BASE_URL}/compra/${id}`, {
            method: 'PUT',
            ...defaultOptions,
            body: JSON.stringify(compra),
        });
        if (!response.ok) throw new Error(`Error al actualizar compra con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en updateCompra:', error);
        throw error;
    }
};

export const deleteCompra = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/compra/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Error al eliminar compra con ID ${id}`);
        return true;
    } catch (error) {
        console.error('Error en deleteCompra:', error);
        throw error;
    }
};