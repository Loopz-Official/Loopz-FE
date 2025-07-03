import {
    cartInquiryResponse,
    cartItemUpdateResponse,
    ObjectId,
    ObjectIdArray,
} from '@/schemas/cart';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

export const getCartInquiry = async () => {
    try {
        const response = await apiClient.get('/object/v1/cart');

        if (response.status === 200) {
            return validate(cartInquiryResponse, response.data.data);
        }

        throw new Error('장바구니 조회에 실패했습니다');
    } catch {
        throw new Error('장바구니 조회 중 오류가 발생했습니다');
    }
};

export const addCartItem = async (objectId: string, quantity: number) => {
    try {
        const response = await apiClient.patch('/object/v1/cart', {
            objectId,
            quantity,
        });

        switch (response.status) {
            case 200:
                validate(cartItemUpdateResponse, response.data.data);
                return;
            case 400:
                throw new Error('잘못된 요청입니다');
            default:
                throw new Error('알 수 없는 오류가 발생했습니다');
        }
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? '선택한 상품 수량이 현재 재고를 초과했어요'
                : '장바구니 추가/수정 중 네트워크 오류가 발생했습니다'
        );
    }
};

export const deleteSingleCartItem = async (objectId: ObjectId) => {
    try {
        const response = await apiClient.delete(`/object/v1/cart/${objectId}`);

        if (response.status === 204) {
            return;
        }

        throw new Error('상품 삭제에 실패했습니다');
    } catch {
        throw new Error('상품 삭제 중 오류가 발생했습니다');
    }
};

export const deleteSelectedCartItems = async (objectIdList: ObjectIdArray) => {
    try {
        const response = await apiClient.delete('/object/v1/cart/selected', {
            data: objectIdList,
        });

        if (response.status === 204) {
            return;
        }

        throw new Error('선택한 상품 삭제에 실패했습니다');
    } catch {
        throw new Error('선택한 상품 삭제 중 오류가 발생했습니다');
    }
};
