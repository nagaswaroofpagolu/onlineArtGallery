const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8082',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/auth/login',
            SIGNUP: '/api/auth/signup'
        },
        ARTWORK: {
            BASE: '/api/artworks',
            LIST: '/api/artworks/list',
            CREATE: '/api/artworks/create',
            UPDATE: '/api/artworks/update',
            DELETE: '/api/artworks/delete'
        }
    }
};

export const getApiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;
export default API_CONFIG;