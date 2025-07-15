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
import { useCheckGroup } from '@/hooks/check';
import * as M from '@/hooks/mutations/useCartMutation';
import { useCartInquiryQuery } from '@/hooks/queries/useCartQuery';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { ObjectId } from '@/schemas/cart';
import * as U from '@/utils/cart/getCart';

export default function CartPage() {
    const router = useRouter();

    const { setSelectedProducts } = useSelectedProductsStore();
    const updateCartItemMutation = M.useUpdateCartItem({
        showToast: false,
    });
    const deleteSingleItemMutation = M.useCartItemDelete();
    const deleteSelectedItemsMutation = M.useSelectedCartItemsDelete();

    const { data: cartData, isLoading, error } = useCartInquiryQuery();
    const availableItems = cartData?.availableItems;
    // const outOfStock = cartData?.outOfStock;

    const isCartEmpty = availableItems?.length === 0;

    // 장바구니 내 상품 선택 관련 로직
    const objectIds = useMemo(
        () => U.getObjectIdsFromCart(availableItems ?? []),
        [availableItems]
    );

    const { checked, isChecked, isAllChecked, toggle, toggleAll } =
        useCheckGroup(objectIds, true);

    const selectedItems =
        availableItems?.filter(({ object }) =>
            checked.includes(object.objectId)
        ) ?? [];

    const itemCount = U.getCartItemCount(selectedItems);
    const totalPrice = U.getCartTotalPrice(selectedItems);
    const finalPrice = U.getCartFinalPrice(totalPrice, DELIVERY_FEE);

    const handleDeleteItem = (objectId: ObjectId) => {
        deleteSingleItemMutation.mutate({ objectId });
    };

    const handleDeleteSelectedItems = () => {
        if (checked.length === 0) {
            toast('삭제할 상품을 선택해주세요');
            return;
        }
        deleteSelectedItemsMutation.mutate(checked);
    };

    const handleEditQuantity = (objectId: ObjectId, quantity: number) => {
        updateCartItemMutation.mutate({ objectId, quantity });
    };

    const handleBottomButtonClick = () => {
        if (checked.length === 0) {
            toast('구매할 상품을 선택해주세요!');
            return;
        }
        const products = selectedItems.map(({ object, quantity }) => ({
            objectId: object.objectId,
            quantity,
        }));
        setSelectedProducts(products);

        router.push('/order/form?orderFrom=cart'); // 추후 Query string 삭제 필요!!
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
                                        onEditQuantity={(newQuantity) =>
                                            handleEditQuantity(
                                                object.objectId,
                                                newQuantity
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
