import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import {
    getAccessToken,
    refreshAccessToken,
    clearSession,
} from "@/context/AuthContext";

//base instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

//request interceptor 4 attaching token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken(); // reads directly from sessionStorage
        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config;
    },
    (error) => Promise.reject(error),
);

//silent token refresh on 401
interface RetryableConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableConfig | undefined;
        const is401 = error.response?.status === 401;
        const notRetried = !originalRequest?._retry;

        if (is401 && notRetried && originalRequest) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                // Clone config with updated auth header and retry
                const retryConfig: InternalAxiosRequestConfig = {
                    ...(originalRequest as InternalAxiosRequestConfig),
                };
                retryConfig.headers.set("Authorization", `Bearer ${newToken}`);

                return api(retryConfig);
            } catch {
                // Refresh failed — clear session and redirect to login
                clearSession();
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

export default api;