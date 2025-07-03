'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import BottomButton from '@/components/common/BottomButton';
import BottomNotice from '@/components/common/BottomNotice';
import CartItem from '@/components/features/cart/CartItem';
import CartSummary from '@/components/features/cart/CartSummary';
import EmptyCart from '@/components/features/cart/EmptyCart';
import ObjectSelectBar from '@/components/features/cart/ObjeSelectBar';
import { DELIVERY_FEE } from '@/constants/delivery';
import {
    useCartItemDelete,
    useSelectedCartItemsDelete,
} from '@/hooks/mutations/useCartMutation';
import { useCartInquiryQuery } from '@/hooks/queries/useCartQuery';
import { useCheckGroup } from '@/hooks/useCheckGroup';
import { ObjectId } from '@/schemas/cart';
import * as U from '@/utils/cart/getCart';

export default function CartPage() {
    const router = useRouter();

    const deleteSingleItemMutation = useCartItemDelete();
    const deleteSelectedItemsMutation = useSelectedCartItemsDelete();

    const { data: cartData, isLoading, error } = useCartInquiryQuery();
    const availableItems = cartData?.availableItems;
    // const outOfStock = cartData?.outOfStock;

    const isCartEmpty = availableItems?.length === 0;

    const itemCount = U.getCartItemCount(cartData);
    const totalPrice = U.getCartTotalPrice(cartData);
    const finalPrice = U.getCartFinalPrice(totalPrice, DELIVERY_FEE);

    // 장바구니 내 상품 선택 관련 로직
    const objectIds = useMemo(
        () => U.getObjectIdsFromCart(availableItems ?? []),
        [availableItems]
    );
    const { checked, isChecked, isAllChecked, toggle, toggleAll } =
        useCheckGroup(objectIds, true);

    const handleDeleteItem = (objectId: ObjectId) => {
        try {
            deleteSingleItemMutation.mutateAsync({ objectId });
            toast.success('상품을 삭제했어요!');
        } catch {
            toast.error('상품 삭제에 실패했어요.');
        }
    };

    const handleDeleteSelectedItems = () => {
        try {
            deleteSelectedItemsMutation.mutateAsync(checked);
            toast.success(`${checked.length}개의 상품을 삭제했어요!`);
        } catch {
            toast.error('상품 삭제에 실패했어요.');
        }
    };

    return (
        <>
            {isCartEmpty ? (
                <EmptyCart />
            ) : (
                <>
                    {error ? (
                        <span>Error: {error.message}</span>
                    ) : isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        <>
                            <ObjectSelectBar
                                objectCount={objectIds.length}
                                selectedCount={checked.length}
                                isAllChecked={isAllChecked}
                                toggleAll={toggleAll}
                                onDeleteSelected={handleDeleteSelectedItems}
                            />
                            <div className="flex flex-col gap-6 px-5 pt-6">
                                {availableItems?.map(({ object, quantity }) => (
                                    <CartItem
                                        isChecked={isChecked(object.objectId)}
                                        toggleCheck={() =>
                                            toggle(object.objectId)
                                        }
                                        key={object.objectId}
                                        itemInfo={object}
                                        quantity={quantity}
                                        onDelete={() =>
                                            handleDeleteItem(object.objectId)
                                        }
                                    />
                                ))}

                                <CartSummary
                                    itemCount={itemCount}
                                    totalPrice={totalPrice}
                                    deliveryFee={DELIVERY_FEE}
                                    finalPrice={finalPrice}
                                />
                            </div>
                        </>
                    )}
                    <BottomNotice type="cart" />
                    <BottomButton
                        text="구매하기"
                        isDisabled={false}
                        onClick={() => router.push('/order/form')}
                    />
                </>
            )}
        </>
    );
}
