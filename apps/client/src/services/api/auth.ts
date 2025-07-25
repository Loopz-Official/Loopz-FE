import {
    logoutResponse,
    nicknameRedundancyResponse,
    nicknameUpdateResponse,
    TermsAgreement,
    userInfo,
} from '@/schemas/auth';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

// 닉네임 중복 검사
export const checkNicknameRedundancy = async (nickname: string) => {
    try {
        const response = await apiClient.get(
            `/user/v1/nickname/validate?nickname=${nickname}`
        );

        // console.log('checkNicknameRedundancy Response: ', response);

        if (response.status === 200) {
            return validate(
                nicknameRedundancyResponse,
                response.data.data,
                'Nickname Redundancy'
            );
        }
        throw new Error('Nickname Redundancy API Error');
    } catch (error) {
        console.error('Error checking nickname redundancy:', error);
        throw error;
        throw error;
    }
};

// Update Nickname
export const updateNickname = async (nickname: string) => {
    try {
        const response = await apiClient.patch('/user/v1/nickname', {
            nickname,
        });

        // console.log('Nickname update: ', response);

        if (response.status === 200) {
            return {
                data: validate(
                    nicknameUpdateResponse,
                    response.data.data,
                    'Nickname Update'
                ),
                status: response.status,
            };
        }
        throw new Error('Nickname Update API Error');
    } catch (error) {
        console.error('Error updating nickname:', error);
        throw error;
    }
};

// Terms Agreement
export const agreeSignupTerms = async (termsAgreement: TermsAgreement) => {
    try {
        const response = await apiClient.patch(
            '/user/v1/terms',
            termsAgreement
        );

        // // console.log('Agree to terms Response: ', response);

        if (response.status === 200) {
            return {
                data: validate(userInfo, response.data.data),
                status: response.status,
            };
        }
    } catch (error) {
        console.error('Error agreeing to terms:', error);
    }
};

// Logout
export const logout = async () => {
    try {
        const response = await apiClient.post('/auth/v1/logout');

        // console.log('Logout Response: ', response);

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
