import {
    ObjectBoardFilterRequest,
    objectBoardResponse,
} from '@/schemas/object';
import { validate } from '@/schemas/utils/validate';
import { apiClient } from '@/services/config/axios';

export const getObjectBoardList = async (params?: ObjectBoardFilterRequest) => {
    try {
        const response = await apiClient.get('/object/v1', {
            params,
        });

        console.log('Object Board 상품 리스트 조회', response);

        return validate(objectBoardResponse, response.data);
    } catch (error) {
        console.error('Object Board  상품 리스트 조회 실패', error);
    }
};
