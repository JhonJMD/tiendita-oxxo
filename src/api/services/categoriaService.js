import { API_BASE_URL, defaultOptions } from '../config';

export const getCategorias = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categoria`);
        if (!response.ok) throw new Error('Error al cargar categorías');
        return await response.json();
    } catch (error) {
        console.error('Error en getCategorias:', error);
        throw error;
    }
};

export const getCategoriaById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categoria/${id}`);
        if (!response.ok) throw new Error(`Error al cargar categoría con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en getCategoriaById:', error);
        throw error;
    }
};

export const createCategoria = async (categoria) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categoria`, {
            method: 'POST',
            ...defaultOptions,
            body: JSON.stringify(categoria),
        });
        if (!response.ok) throw new Error('Error al crear categoría');
        return await response.json();
    } catch (error) {
        console.error('Error en createCategoria:', error);
        throw error;
    }
};

export const updateCategoria = async (id, categoria) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categoria/${id}`, {
            method: 'PUT',
            ...defaultOptions,
            body: JSON.stringify(categoria),
        });
        if (!response.ok) throw new Error(`Error al actualizar categoría con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en updateCategoria:', error);
        throw error;
    }
};

export const deleteCategoria = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categoria/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Error al eliminar categoría con ID ${id}`);
        return true;
    } catch (error) {
        console.error('Error en deleteCategoria:', error);
        throw error;
    }
};