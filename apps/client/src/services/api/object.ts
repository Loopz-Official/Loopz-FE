import Qs from 'qs';

import {
    FilteredObjectRequest,
    ObjectBoardFilterRequest,
    ObjectBoardResponse,
    objectBoardResponse,
    objectDetailInfo,
} from '@/schemas/object/object';
import { validate } from '@/schemas/utils/validate';
import { apiClient } from '@/services/config/axios';

// 오브제 보드 조회
export const getObjectBoardList = async (
    params?: ObjectBoardFilterRequest
): Promise<ObjectBoardResponse> => {
    try {
        const response = await apiClient.get('/object/v1', {
            params,
            paramsSerializer: (params) =>
                Qs.stringify(params, { arrayFormat: 'repeat' }),
        });

        // console.log('Object Board 상품 리스트 조회', response.data.data);

        if (response.status === 200) {
            return validate(objectBoardResponse, response.data.data);
        }
        throw new Error('Invalid response status');
    } catch (error) {
        console.error('Object Board  상품 리스트 조회 실패', error);
        throw error;
    }
};

// 오브제 상세 조회
export const getObjectDetail = async (objectId: string) => {
    try {
        const response = await apiClient.get(`/object/v1/${objectId}`);

        // console.log('Object Board 상품 상세 조회', response);

        if (response.status === 200) {
            return validate(objectDetailInfo, response.data.data);
        }
    } catch (error) {
        console.error('Object Board  상품 상세 조회 실패', error);
    }
};

// 오브제 좋아요 추가/삭제
export const toggleObjectLike = async (objectId: string) => {
    try {
        const response = await apiClient.patch(`/object/v1/likes/${objectId}`);

        // console.log('좋아요 추가/삭제', response);

        if (response.status === 204) return;
        throw new Error('Invalid response status');
    } catch (error) {
        console.error('좋아요 추가/삭제 실패', error);
        throw error;
    }
};

// 오브제 좋아요 조회
export const getLikedObjectList = async (params: FilteredObjectRequest) => {
    try {
        const response = await apiClient.get('/object/v1/likes', {
            params,
        });

        // console.log('Liked Object List', response);

        if (response.status === 200) {
            return validate(objectBoardResponse, response.data.data);
        }
        throw new Error('Invalid response status');
    } catch (error) {
        console.error('좋아요 조회 실패', error);
        throw error;
    }
};
