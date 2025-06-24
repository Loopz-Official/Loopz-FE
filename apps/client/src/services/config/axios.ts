import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LOOPZ_PROD_SERVER,
    headers: {
        'Content-type': 'application/json',
    },
});
