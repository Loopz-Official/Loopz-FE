import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CartOrderRequest, DetailOrderRequest } from '@/schemas/order';
import { placeCartOrder, placeDetailOrder } from '@/services/api/order';

type PlaceOrderParams =
    | { orderFrom: 'cart'; data: CartOrderRequest }
    | { orderFrom: 'detail'; data: DetailOrderRequest & { objectId: string } };

export const usePlaceOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: PlaceOrderParams) => {
            if (params.orderFrom === 'cart') {
                return await placeCartOrder(params.data);
            } else {
                return await placeDetailOrder(
                    params.data.objectId,
                    params.data
                );
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['orderComplete'], data);
        },
    });
};
