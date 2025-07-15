import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
    CartItemUpdateResponse,
    ObjectId,
    ObjectIdArray,
} from '@/schemas/cart';
import {
    deleteSelectedCartItems,
    deleteSingleCartItem,
    updateCartItem,
} from '@/services/api/cart';
import { handleMutationError } from '@/utils/error/handleMutationError';

import type { UseUpdateCartItemOptions } from './types';

type AddCartMutationProps = CartItemUpdateResponse & {
    objectId: ObjectId;
};

export const useUpdateCartItem = (options?: UseUpdateCartItemOptions) => {
    const queryClient = useQueryClient();
    const showToast = options?.showToast ?? true;

    return useMutation({
        mutationFn: ({ objectId, quantity }: AddCartMutationProps) =>
            updateCartItem(objectId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            if (showToast) {
                toast.success('장바구니에 상품을 담았어요!');
            }
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
            toast.success('상품을 삭제했어요!');
        },
        onError: handleMutationError,
    });
};

export const useSelectedCartItemsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (objectIdList: ObjectIdArray) =>
            deleteSelectedCartItems(objectIdList),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success(`${variables.length}개의 상품을 삭제했어요!`);
        },
        onError: handleMutationError,
    });
};
