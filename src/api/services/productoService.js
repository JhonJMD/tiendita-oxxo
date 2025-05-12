import { API_BASE_URL, defaultOptions } from '../config';

export const getProductos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/producto`);
        if (!response.ok) throw new Error('Error al cargar productos');
        return await response.json();
    } catch (error) {
        console.error('Error en getProductos:', error);
        throw error;
    }
};

export const getProductoById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/producto/${id}`);
        if (!response.ok) throw new Error(`Error al cargar producto con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en getProductoById:', error);
        throw error;
    }
};

export const createProducto = async (producto) => {
    try {
        const response = await fetch(`${API_BASE_URL}/producto`, {
            method: 'POST',
            ...defaultOptions,
            body: JSON.stringify(producto),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al crear producto');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en createProducto:', error);
        throw error;
    }
};

export const updateProducto = async (id, producto) => {
    try {
        const response = await fetch(`${API_BASE_URL}/producto/${id}`, {
            method: 'PUT',
            ...defaultOptions,
            body: JSON.stringify(producto),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error al actualizar producto con ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en updateProducto:', error);
        throw error;
    }
};

export const deleteProducto = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/producto/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Error al eliminar producto con ID ${id}`);
        return true;
    } catch (error) {
        console.error('Error en deleteProducto:', error);
        throw error;
    }
};