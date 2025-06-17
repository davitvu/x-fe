import axios from "axios"
import { refreshToken } from "./auth.service";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

let isRefreshing = false;

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error) {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry && !isRefreshing) {
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await refreshToken();
                if (res?.data?.data?.accessToken) {
                    localStorage.setItem('accessToken', res.data.data.accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`;
                    
                    return instance(originalRequest);
                }
            } catch (error) {
                isRefreshing = false;
                localStorage.removeItem('accessToken');
                return Promise.reject(error);
            }

        }
        return error.response;
    }
    return Promise.reject(error);
});

export default instance;