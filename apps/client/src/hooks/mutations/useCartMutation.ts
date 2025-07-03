import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ObjectId } from '@/schemas/cart';
import { addCartItem, deleteSingleCartItem } from '@/services/api/cart';

type AddCartMutationProps = {
    objectId: string;
    quantity: number;
};

export const useAddCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ objectId, quantity }: AddCartMutationProps) =>
            addCartItem(objectId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export const useDeleteSingleCartItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ objectId }: { objectId: ObjectId }) =>
            deleteSingleCartItem(objectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};
