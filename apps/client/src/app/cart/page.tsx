'use client';

import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';
import BottomNotice from '@/components/common/BottomNotice';
import CartItem from '@/components/features/cart/CartItem';
import CartSummary from '@/components/features/cart/CartSummary';
import EmptyCart from '@/components/features/cart/EmptyCart';
import ObjectSelectBar from '@/components/features/cart/ObjeSelectBar';
import { useCartInquiryQuery } from '@/hooks/queries/useCartQuery';
import {
    getCartFinalPrice,
    getCartItemCount,
    getCartTotalPrice,
} from '@/utils/cart/getCart';

export default function CartPage() {
    const router = useRouter();

    const { data: cartData, isLoading, error } = useCartInquiryQuery();
    const availableItems = cartData?.availableItems;
    // const outOfStock = cartData?.outOfStock;

    const isCartEmpty =
        availableItems?.length === 0 && cartData?.outOfStock.length === 0;

    const deliveryFee = 3000;
    const itemCount = getCartItemCount(cartData);
    const totalPrice = getCartTotalPrice(cartData);
    const finalPrice = getCartFinalPrice(totalPrice, deliveryFee);

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
                            <ObjectSelectBar />
                            <div className="flex flex-col gap-6 px-5 pt-6">
                                {availableItems?.map(({ object, quantity }) => (
                                    <CartItem
                                        key={object.objectId}
                                        itemInfo={object}
                                        quantity={quantity}
                                    />
                                ))}

                                <CartSummary
                                    itemCount={itemCount}
                                    totalPrice={totalPrice}
                                    deliveryFee={deliveryFee}
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
