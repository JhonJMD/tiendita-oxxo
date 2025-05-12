export const API_BASE_URL = 'http://localhost:8080/api';

export const ENDPOINTS = {
    PRODUCTOS: {
        LIST: `${API_BASE_URL}/producto`,
        DETAIL: (id) => `${API_BASE_URL}/producto/${id}`,
        CREATE: `${API_BASE_URL}/producto`,
        UPDATE: (id) => `${API_BASE_URL}/producto/${id}`,
        DELETE: (id) => `${API_BASE_URL}/producto/${id}`,
    },
    CATEGORIAS: {
        LIST: `${API_BASE_URL}/categoria`,
        DETAIL: (id) => `${API_BASE_URL}/categoria/${id}`,
        CREATE: `${API_BASE_URL}/categoria`,
        UPDATE: (id) => `${API_BASE_URL}/categoria/${id}`,
        DELETE: (id) => `${API_BASE_URL}/categoria/${id}`,
    },
    CLIENTES: {
        LIST: `${API_BASE_URL}/cliente`,
        DETAIL: (id) => `${API_BASE_URL}/cliente/${id}`,
        CREATE: `${API_BASE_URL}/cliente`,
        UPDATE: (id) => `${API_BASE_URL}/cliente/${id}`,
        DELETE: (id) => `${API_BASE_URL}/cliente/${id}`,
    },
    COMPRAS: {
        LIST: `${API_BASE_URL}/compra`,
        DETAIL: (id) => `${API_BASE_URL}/compra/${id}`,
        CREATE: `${API_BASE_URL}/compra`,
        UPDATE: (id) => `${API_BASE_URL}/compra/${id}`,
        DELETE: (id) => `${API_BASE_URL}/compra/${id}`,
    },
};