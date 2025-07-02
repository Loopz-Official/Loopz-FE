'use client';

import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';
import BottomNotice from '@/components/common/BottomNotice';
import CartItem from '@/components/features/cart/CartItem';
import CartSummary from '@/components/features/cart/CartSummary';
import EmptyCart from '@/components/features/cart/EmptyCart';
import ObjectSelectBar from '@/components/features/cart/ObjeSelectBar';
import { useCartInquiryQuery } from '@/hooks/queries/useCartQuery';

export default function CartPage() {
    const router = useRouter();

    const { data: cartData } = useCartInquiryQuery();
    const availableItems = cartData?.availableItems;
    // const outOfStock = cartData?.outOfStock;

    const isCartEmpty =
        availableItems?.length === 0 && cartData?.outOfStock.length === 0;

    return (
        <>
            {isCartEmpty ? (
                <EmptyCart />
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

                        <CartSummary />
                    </div>
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
