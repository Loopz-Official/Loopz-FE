'use client';

import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';
import BottomNotice from '@/components/common/BottomNotice';
import CartItem from '@/components/features/cart/CartItem';
import CartSummary from '@/components/features/cart/CartSummary';
import EmptyCart from '@/components/features/cart/EmptyCart';
import ObjectSelectBar from '@/components/features/cart/ObjeSelectBar';

export default function CartPage() {
    const router = useRouter();

    const isCartEmpty = false;

    return (
        <>
            {isCartEmpty ? (
                <EmptyCart />
            ) : (
                <>
                    <ObjectSelectBar />
                    <div className="flex flex-col gap-6 px-5 pt-6">
                        <CartItem />
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
