import {
    googleTokenResponse,
    GoogleTokenResponse,
    serverAuthResponse,
} from '@/schemas/oauth';
import { validate } from '@/schemas/utils/validate';

import { apiClient, apiClientGoogleAuth } from '../config/axios';

export const getGoogleToken = async (code: string) => {
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const client_secret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
    const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;
    const grant_type = 'authorization_code';

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', client_id);
    params.append('client_secret', client_secret);
    params.append('redirect_uri', redirect_uri);
    params.append('grant_type', grant_type);

    try {
        const response = await apiClientGoogleAuth.post('/token', params);

        // console.log('Google Token Response: ', response.data);
        return validate(googleTokenResponse, response.data);
    } catch (error) {
        console.error('Error fetching Google token:', error);
    }
};

export const postGoogleToken = async (tokenResponse: GoogleTokenResponse) => {
    try {
        const response = await apiClient.post('/auth/v1/login/google', {
            accessToken: tokenResponse.access_token,
            idToken: tokenResponse.id_token,
        });

        console.log('Service Server Response: ', response.data);
        return {
            status: response.data.status,
            data: validate(serverAuthResponse, response.data.data),
        };
    } catch (error) {
        console.error('Error posting Google token :', error);
    }
};
