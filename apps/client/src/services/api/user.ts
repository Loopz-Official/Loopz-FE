import { myAccountInfo } from '@/schemas/user';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

export const getMyAccountInfo = async () => {
    try {
        const response = await apiClient.get('/user/v1/me');

        // console.log('My Account Info Response:', response);

        if (response.status === 200) {
            return validate(
                myAccountInfo,
                response.data.data,
                'My Account Info'
            );
        }
        throw new Error('Failed to fetch my account info');
    } catch (error) {
        console.error('Error fetching my account info:', error);
        throw error;
    }
};
