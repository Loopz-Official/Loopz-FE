import { apiClient } from '../config/axios';

// 닉네임 중복 검사
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

// Update Nickname
export const updateNickname = async (nickname: string) => {
    try {
        const response = await apiClient.patch('/user/v1/nickname', {
            nickname,
        });

        if (response.data.status === 200) {
            console.log('Nickname updated successfully: ', response);

            return response.data.status;
        }
    } catch (error) {
        console.error('Error updating nickname:', error);
    }
};
