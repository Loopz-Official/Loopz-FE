import { orderHistory, OrderRequest, orderResponse } from '@/schemas/order';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

// 주문 생성 API
export const placeOrder = async (orderRequest: OrderRequest) => {
    try {
        const response = await apiClient.post('/order/v1', orderRequest);

        console.log('Place Order Response: ', response);

        if (response.status === 200) {
            return validate(
                orderResponse,
                response.data.data,
                'Order Response'
            );
        }
        throw new Error('Failed to place order');
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

// 주문 내역 조회 API
export const getOrderHistory = async () => {
    try {
        const response = await apiClient.get('/order/v1');

        console.log('Order History Response: ', response);

        if (response.status === 200) {
            return validate(
                orderHistory,
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
export const getOrderDetail = async (orderId: string) => {
    try {
        const response = await apiClient.get(`/order/v1/${orderId}`);

        console.log('Order Detail Response: ', response);

        if (response.status === 200) {
            // // 추후 DTO 확정 시 반영
            // return validate(
            //     orderResponse,
            //     response.data.data,
            //     'Order Detail Response'
            // );
            return response.data.data;
        }
        throw new Error('Failed to fetch order detail');
    } catch (error) {
        console.error('Error fetching order detail:', error);
        throw error;
    }
};
