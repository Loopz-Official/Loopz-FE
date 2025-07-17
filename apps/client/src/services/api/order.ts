import {
    OrderDetailResponse,
    orderDetailResponse,
    OrderHistoryResponse,
    orderHistoryResponse,
    OrderRequest,
    placedOrderResponse,
} from '@/schemas/order';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

// 주문 생성 API
export const placeOrder = async (orderRequest: OrderRequest) => {
    try {
        const response = await apiClient.post('/order/v1', orderRequest);

        console.log('Place Order Response: ', response);

        if (response.status === 200) {
            return validate(
                placedOrderResponse,
                response.data.data,
                'Place Order Response'
            );
        }
        throw new Error('Failed to place order');
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

// 주문 내역 조회 API
export const getOrderHistory = async (): Promise<OrderHistoryResponse> => {
    try {
        const response = await apiClient.get('/order/v1');

        console.log('Order History Response: ', response);

        if (response.status === 200) {
            return validate(
                orderHistoryResponse,
                response.data.data,
                'Order History Response'
            );
        }
        throw new Error('Failed to fetch order history');
    } catch (error) {
        console.error('Error fetching order history:', error);
        throw error;
    }
};

// 특정 주문 조회 API
export const getOrderDetail = async (
    orderId: string
): Promise<OrderDetailResponse> => {
    try {
        const response = await apiClient.get(`/order/v1/${orderId}`);

        console.log('Order Detail Response: ', response);

        if (response.status === 200) {
            return validate(
                orderDetailResponse,
                response.data.data,
                'Order Detail Response'
            );
        }
        throw new Error('Failed to fetch order detail');
    } catch (error) {
        console.error('Error fetching order detail:', error);
        throw error;
    }
};
