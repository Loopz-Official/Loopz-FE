import axios from 'axios';

import { OAUTH_GOOGLE_API } from '@/constants/auth';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LOOPZ_PROD_SERVER,
    headers: {
        'Content-type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access-token');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        console.log('Request Error: ', error);

        if (error?.response.status === 401 || error?.response.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/auth/login'; // 추후 가능하면 UX 보완
        }

        return Promise.reject(error);
    }
);

export const apiClientGoogleAuth = axios.create({
    baseURL: OAUTH_GOOGLE_API,
});
