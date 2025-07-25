import { useQuery } from '@tanstack/react-query';

import { getOrderDetail, getOrderHistory } from '@/services/api/order';

export const useOrderHistoryQuery = (orderId?: string) => {
    return useQuery({
        queryKey: ['order-history', orderId],
        queryFn: getOrderHistory,
        staleTime: 1000 * 10,
        gcTime: 1000 * 30,
    });
};

export const useOrderDetailQuery = (orderId: string) => {
    return useQuery({
        queryKey: ['order-detail', orderId],
        queryFn: () => getOrderDetail(orderId), // 주문 ID로 fetch
        enabled: !!orderId,
        staleTime: 1000 * 10,
        gcTime: 1000 * 30,
    });
};
