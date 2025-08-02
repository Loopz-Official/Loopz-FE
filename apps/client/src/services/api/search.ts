import {
    relativeObjectResponse,
    searchHistoryResponse,
} from '@/schemas/search';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

// 관련 검색어(제품명) 조회 API
export const getRelativeObject = async (keyword: string) => {
    try {
        const response = await apiClient.get(`/search/v1?keyword=${keyword}`);

        if (response.status === 200) {
            return validate(
                relativeObjectResponse,
                response.data.data,
                'Relative Object Response'
            );
        }
        throw new Error('Failed to fetch relative object');
    } catch (error) {
        console.error('Error fetcing relative object:', error);
        throw error;
    }
};

// 최근 검색어 조회 API
export const getSearchHistory = async () => {
    try {
        const response = await apiClient.get(`/search/v1/history`);

        if (response.status === 200) {
            return validate(
                searchHistoryResponse,
                response.data.data,
                'Search History Response'
            );
        }
        throw new Error('Failed to fetch search history');
    } catch (error) {
        console.error('Error fetcing search history:', error);
        throw error;
    }
};

// 최근 검색어 삭제 API
export const deleteSearchHistory = async (searchId: string) => {
    try {
        const response = await apiClient.delete(`/search/v1/${searchId}`);

        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Failed to delete search history');
    } catch (error) {
        console.error('Error deleting search history:', error);
        throw error;
    }
};

// 최근 검색어 삭제 API
export const deleteAllSearchHistory = async () => {
    try {
        const response = await apiClient.delete(`/search/v1`);

        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Failed to delete all search history');
    } catch (error) {
        console.error('Error deleting allsearch history:', error);
        throw error;
    }
};
