'use client';

import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';
import BottomNotice from '@/components/common/BottomNotice';
import ObjectSelectBar from '@/components/features/cart/ObjeSelectBar';

export default function CartPage() {
    const router = useRouter();

    return (
        <>
            <ObjectSelectBar />
            <BottomNotice type="cart" />
            <BottomButton
                text="구매하기"
                isDisabled={false}
                onClick={() => router.push('/order/form')}
            />
        </>
    );
}
