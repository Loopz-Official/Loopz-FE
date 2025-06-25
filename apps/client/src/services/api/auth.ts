import { apiClient } from '../config/axios';

export const checkNicknameRedundancy = async (nickname: string) => {
    try {
        const response = await apiClient.get(
            `/user/v1/nickname/validate?nickname=${nickname}`
        );

        console.log('checkNicknameRedundancy Response: ', response);

        return response.data.data;
    } catch (error) {
        console.error('Error checking nickname redundancy:', error);
    }
};
