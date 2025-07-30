import {
    OrderDetailResponse,
    orderDetailResponse,
    OrderHistoryResponse,
    orderHistoryResponse,
} from '@/schemas/order';
import { relativeObjectResponse } from '@/schemas/search';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

// 관련 검색어(제품명) 조회 API
export const getRelativeObject = async (keyword: string) => {
    try {
        const response = await apiClient.get(`search/v1?keyword=${keyword}`);

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

// 주문 내역 조회 API
export const getOrderHistory = async (): Promise<OrderHistoryResponse> => {
    try {
        const response = await apiClient.get('/order/v1');

        // console.log('Order History Response: ', response);

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

        // console.log('Order Detail Response: ', response);

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
