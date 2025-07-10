import {
    ObjectBoardFilterRequest,
    ObjectBoardResponse,
    objectBoardResponse,
    objectDetailInfo,
} from '@/schemas/object/object';
import { validate } from '@/schemas/utils/validate';
import { apiClient } from '@/services/config/axios';

export const getObjectBoardList = async (
    params?: ObjectBoardFilterRequest
): Promise<ObjectBoardResponse> => {
    try {
        const response = await apiClient.get('/object/v1', { params });

        console.log('Object Board 상품 리스트 조회', response.data.data);

        if (response.status === 200) {
            return validate(objectBoardResponse, response.data.data);
        }
        throw new Error('Invalid response status');
    } catch (error) {
        console.error('Object Board  상품 리스트 조회 실패', error);
        throw error;
    }
};

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
