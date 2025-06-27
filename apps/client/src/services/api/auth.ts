import { logoutResponse, TermsAgreement } from '@/schemas/auth';
import { validate } from '@/schemas/utils/validate';

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

        if (response.status === 200) {
            console.log('Nickname updated successfully: ', response);

            return response.status;
        }
    } catch (error) {
        console.error('Error updating nickname:', error);
    }
};

// Terms Agreement
export const agreeSignupTerms = async (termsAgreement: TermsAgreement) => {
    try {
        const response = await apiClient.patch(
            '/user/v1/terms',
            termsAgreement
        );

        console.log('Agree to terms Response: ', response);

        if (response.status === 200) {
            return response.status;
        }
    } catch (error) {
        console.error('Error agreeing to terms:', error);
    }
};

// Logout
export const logout = async () => {
    try {
        const response = await apiClient.post('/auth/v1/logout');

        console.log('Logout Response: ', response);

        if (response.status === 200) {
            return {
                data: validate(logoutResponse, response.data.data),
                status: response.status,
            };
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
