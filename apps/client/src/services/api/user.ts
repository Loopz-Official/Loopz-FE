import { deatilAccountInfo, GenderType, myAccountInfo } from '@/schemas/user';
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

export const updateMyAccoundInfo = async (
    nickName: string,
    birthDate?: string,
    gender?: GenderType
) => {
    try {
        const response = await apiClient.patch('/user/v1/detail', {
            nickName,
            birthDate,
            gender,
        });

        if (response.status === 200) {
            return validate(
                deatilAccountInfo,
                response.data.data,
                'Detail Account Info'
            );
        }
        throw new Error('Failed to fetch detail account info');
    } catch (error) {
        console.error('Error fetching detail account info:', error);
        throw error;
    }
};
