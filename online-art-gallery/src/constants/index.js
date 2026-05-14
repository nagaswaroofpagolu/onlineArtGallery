// Role constants
export const ROLES = {
    ARTIST: 'ARTIST',
    CUSTOMER: 'CUSTOMER',
    ADMIN: 'ADMIN'
};

// Route paths
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    ARTIST: {
        DASHBOARD: '/artist-dashboard',
        PROFILE: '/artist-profile',
        ADD_ARTWORK: '/add-artwork',
        MANAGE_ARTWORKS: '/manage-artworks'
    },
    CUSTOMER: {
        DASHBOARD: '/customer-dashboard',
        PROFILE: '/customer-profile',
        ORDERS: '/my-orders',
        GALLERY: '/artworks'
    },
    ADMIN: {
        DASHBOARD: '/admin-dashboard'
    }
};

// Local storage keys
export const STORAGE_KEYS = {
    USER: 'user',
    TOKEN: 'token'
};

export const isValidRole = (role) => {
    return Object.values(ROLES).includes(role?.toUpperCase());
};

export const getRoleBasedDashboard = (role) => {
    switch(role?.toUpperCase()) {
        case ROLES.ARTIST:
            return ROUTES.ARTIST.DASHBOARD;
        case ROLES.CUSTOMER:
            return ROUTES.CUSTOMER.DASHBOARD;
        case ROLES.ADMIN:
            return ROUTES.ADMIN.DASHBOARD;
        default:
            return ROUTES.LOGIN;
    }
};

export const getRoleBasedProfile = (role) => {
    switch(role?.toUpperCase()) {
        case ROLES.ARTIST:
            return ROUTES.ARTIST.PROFILE;
        case ROLES.CUSTOMER:
            return ROUTES.CUSTOMER.PROFILE;
        default:
            return ROUTES.LOGIN;
    }
};