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
import * as M from '@/hooks/mutations/useCartMutation';
import { useCartInquiryQuery } from '@/hooks/queries/useCartQuery';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { useCheckGroup } from '@/hooks/useCheckGroup';
import { ObjectId } from '@/schemas/cart';
import * as U from '@/utils/cart/getCart';

export default function CartPage() {
    const router = useRouter();

    const updateCartItemMutation = M.useUpdateCartItem();
    const deleteSingleItemMutation = M.useCartItemDelete();
    const deleteSelectedItemsMutation = M.useSelectedCartItemsDelete();

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
        deleteSingleItemMutation.mutateAsync({ objectId });
        toast.success('상품을 삭제했어요!');
    };

    const handleDeleteSelectedItems = () => {
        deleteSelectedItemsMutation.mutateAsync(checked);
        toast.success(`${checked.length}개의 상품을 삭제했어요!`);
    };

    const handleEditQuantity = (objectId: ObjectId, quantity: number) => {
        updateCartItemMutation.mutateAsync({ objectId, quantity });
    };

    const { setProducts } = useSelectedProductsStore();

    const handleBottomButtonClick = () => {
        if (!availableItems) return;

        const filteredItems = availableItems.filter(({ object }) =>
            checked.includes(object.objectId)
        );

        const selected = filteredItems.map(({ object }, i) => ({
            objectId: object.objectId,
            objectName: object.objectName,
            objectPrice: object.objectPrice,
            imageUrl: object.imageUrl,
            quantity: filteredItems[i]?.quantity ?? 0,
        }));

        setProducts(selected);

        router.push('/order/form/cart');
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
                                        onEditQuantity={(delta) =>
                                            handleEditQuantity(
                                                object.objectId,
                                                delta
                                            )
                                        }
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
                        onClick={handleBottomButtonClick}
                    />
                </>
            )}
        </>
    );
}
