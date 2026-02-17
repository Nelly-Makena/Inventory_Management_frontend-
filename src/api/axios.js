import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
});

// Request interceptor - adds token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handles token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If token is expired (401) and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                try {
                    // Try to refresh the token
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/api/auth_app/token/refresh/`,
                        { refresh: refreshToken }
                    );

                    const { access } = response.data;

                    // Save new access token
                    localStorage.setItem("access_token", access);

                    // Retry the original request with new token
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    // Refresh failed, clear storage
                    localStorage.clear();
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;