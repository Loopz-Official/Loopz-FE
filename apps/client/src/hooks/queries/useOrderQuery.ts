import { useQuery } from '@tanstack/react-query';

import { OrderResponse } from '@/schemas/order';

export const useOrderCompleteQuery = () => {
    return useQuery<OrderResponse>({
        queryKey: ['orderComplete'],
    });
};
