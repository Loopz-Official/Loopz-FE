import {
    cartOrderRequest,
    CartOrderRequest,
    detailOrderRequest,
    DetailOrderRequest,
} from '@/schemas/order';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

// 상세보기에서 주문
export const placeDetailOrder = async (
    objectId: string,
    orderRequest: DetailOrderRequest
) => {
    try {
        const response = await apiClient.post(
            `/order/v1/${objectId}`,
            orderRequest
        );

        console.log('Place Detail Order Response: ', response);

        if (response.status === 200) {
            return validate(
                detailOrderRequest, // 수정 필요 (Response 스키마 사용)
                response.data.data,
                'Detail Order Response'
            );
        }

        throw new Error('Failed to place order');
    } catch (error) {
        console.error('Error placing detail order:', error);
        throw error;
    }
};

// 장바구니에서 주문
export const placeCartOrder = async (orderRequest: CartOrderRequest) => {
    try {
        const response = await apiClient.post('/order/v1/cart', orderRequest);

        console.log('Place Cart Order Response: ', response);

        if (response.status === 200) {
            return validate(
                cartOrderRequest, // 수정 필요 (Response 스키마 사용)
                response.data.data,
                'Cart Order Response'
            );
        }

        throw new Error('Failed to place order');
    } catch (error) {
        console.error('Error placing cart order:', error);
        throw error;
    }
};
