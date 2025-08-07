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

        // console.log('Agree to terms Response: ', response);

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

export const leave = async (reason: string) => {
    try {
        await apiClient.delete('/user/v1', {
            data: { reason },
        });

        return;
    } catch (error) {
        console.error('Error leaving:', error);
        throw new Error('회원 탈퇴 중 문제가 발생했습니다.');
    }
};
