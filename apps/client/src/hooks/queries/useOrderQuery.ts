import { useQuery } from '@tanstack/react-query';

import { OrderResponse } from '@/schemas/order';

export const useOrderCompleteQuery = () => {
    return useQuery<OrderResponse>({
        queryKey: ['orderComplete'],
    });
};

// // 주문 생성 API 만들어지면 적용
// export const useOrderCompleteQuery = (orderId: string) => {
//     return useQuery<OrderResponse>({
//         queryKey: ['orderComplete', orderId],
//         queryFn: () => fetchOrderComplete(orderId), // 주문 ID로 fetch
//     });
// };
