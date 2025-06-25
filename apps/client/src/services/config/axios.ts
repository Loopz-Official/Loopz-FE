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

export const apiClientGoogleAuth = axios.create({
    baseURL: OAUTH_GOOGLE_API,
});
