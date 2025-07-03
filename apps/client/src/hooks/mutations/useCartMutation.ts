import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ObjectId, ObjectIdArray } from '@/schemas/cart';
import {
    addCartItem,
    deleteSelectedCartItems,
    deleteSingleCartItem,
} from '@/services/api/cart';
import { handleMutationError } from '@/utils/error/handleMutationError';

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
        onError: handleMutationError,
    });
};

export const useCartItemDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ objectId }: { objectId: ObjectId }) =>
            deleteSingleCartItem(objectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: handleMutationError,
    });
};

export const useSelectedCartItemsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (objectIdList: ObjectIdArray) =>
            deleteSelectedCartItems(objectIdList),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: handleMutationError,
    });
};
