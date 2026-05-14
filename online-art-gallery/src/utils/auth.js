/**
 * Authentication Utility Functions
 * Provides helper functions for checking user authentication status
 */

/**
 * Check if user is logged in by verifying JWT token in localStorage
 * @returns {boolean} true if user has a valid token, false otherwise
 */
export function isLoggedIn() {
    try {
        const token = localStorage.getItem("token");
        // Robust validation: token must be a non-empty string with reasonable length
        if (!token || typeof token !== 'string' || token.trim().length < 10) {
            return false;
        }
        // Additional checks for common edge cases
        if (token === 'null' || token === 'undefined' || token === 'false') {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
}

/**
 * Get the current user's JWT token
 * @returns {string|null} JWT token or null if not logged in
 */
export function getAuthToken() {
    return localStorage.getItem("token");
}

/**
 * Get the current user's information from localStorage
 * @returns {Object|null} User object or null if not logged in
 */
export function getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch (error) {
        console.error("Failed to parse user data:", error);
        return null;
    }
}

/**
 * Check if user is logged in and redirect to login page if not
 * @param {Function} navigate - React Router navigate function
 * @param {string} message - Optional alert message to show
 * @returns {boolean} true if logged in, false if redirected
 */
export function requireLogin(navigate, message = "Please login to continue.") {
    if (!isLoggedIn()) {
        alert(message);
        navigate("/login");
        return false;
    }
    return true;
}
