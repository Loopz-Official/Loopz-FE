import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OrderRequest } from '@/schemas/order';
import { placeOrder } from '@/services/api/order';
import { handleMutationError } from '@/utils/error/handleMutationError';

export const usePlaceOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderRequest: OrderRequest) => placeOrder(orderRequest),
        onSuccess: (data) => {
            queryClient.setQueryData(['order-detail'], data.orderId);
        },
        onError: handleMutationError,
    });
};
