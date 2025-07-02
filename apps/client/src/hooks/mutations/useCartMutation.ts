import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCartItem } from '@/services/api/cart';

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
