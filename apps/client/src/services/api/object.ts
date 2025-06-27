import {
    ObjectBoardFilterRequest,
    objectBoardResponse,
} from '@/schemas/object';
import { objectDetailInfo } from '@/schemas/objectDetail';
import { validate } from '@/schemas/utils/validate';
import { apiClient } from '@/services/config/axios';

export const getObjectBoardList = async (params?: ObjectBoardFilterRequest) => {
    try {
        const response = await apiClient.get('/object/v1', {
            params,
        });

        // console.log('Object Board 상품 리스트 조회', response.data.data);

        return await validate(objectBoardResponse, response.data.data);
    } catch (error) {
        console.error('Object Board  상품 리스트 조회 실패', error);
    }
};

export const getObjectDetail = async (objectId: string) => {
    try {
        const response = await apiClient.get(`/object/v1/${objectId}`);

        console.log('Object Board 상품 상세 조회', response);

        if (response.status === 200) {
            return validate(objectDetailInfo, response.data.data);
        }
    } catch (error) {
        console.error('Object Board  상품 상세 조회 실패', error);
    }
};
