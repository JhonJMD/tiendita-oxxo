import { API_BASE_URL, defaultOptions } from '../config';

export const getClientes = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cliente`);
        if (!response.ok) throw new Error('Error al cargar clientes');
        return await response.json();
    } catch (error) {
        console.error('Error en getClientes:', error);
        throw error;
    }
};

export const getClienteById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cliente/${id}`);
        if (!response.ok) throw new Error(`Error al cargar cliente con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en getClienteById:', error);
        throw error;
    }
};

export const createCliente = async (cliente) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cliente`, {
            method: 'POST',
            ...defaultOptions,
            body: JSON.stringify(cliente),
        });
        if (!response.ok) throw new Error('Error al crear cliente');
        return await response.json();
    } catch (error) {
        console.error('Error en createCliente:', error);
        throw error;
    }
};

export const updateCliente = async (id, cliente) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cliente/${id}`, {
            method: 'PUT',
            ...defaultOptions,
            body: JSON.stringify(cliente),
        });
        if (!response.ok) throw new Error(`Error al actualizar cliente con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en updateCliente:', error);
        throw error;
    }
};

export const deleteCliente = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cliente/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Error al eliminar cliente con ID ${id}`);
        return true;
    } catch (error) {
        console.error('Error en deleteCliente:', error);
        throw error;
    }
};