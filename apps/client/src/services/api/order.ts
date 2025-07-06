import {
    cartOrderRequest,
    CartOrderRequest,
    detailOrderRequest,
    DetailOrderRequest,
} from '@/schemas/order';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

// 상세보기에서 주문
export const createDetailOrder = async (
    objectId: string,
    body: DetailOrderRequest
) => {
    try {
        const response = await apiClient.post(`/order/v1/${objectId}`, body);

        console.log('Create Detail Order Response: ', response);

        if (response.status === 200) {
            return validate(detailOrderRequest, response.data.data);
        }

        throw new Error('Failed to create address');
    } catch (error) {
        console.error('Error creating detail order:', error);
        throw error;
    }
};

// 장바구니에서 주문
export const createCartOrder = async (body: CartOrderRequest) => {
    try {
        const response = await apiClient.post('/order/v1/cart', body);

        console.log('Create Cart Order Response: ', response);

        if (response.status === 200) {
            return validate(cartOrderRequest, response.data.data);
        }

        throw new Error('Failed to create address');
    } catch (error) {
        console.error('Error creating cart order:', error);
        throw error;
    }
};
