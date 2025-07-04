'use client';

import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';

export default function CartBottomButton({
    isDisabled,
}: {
    isDisabled: boolean;
}) {
    const router = useRouter();

    return (
        <BottomButton
            text={'장바구니 결제하기'}
            isDisabled={isDisabled}
            onClick={() => router.push('/order/confirm')}
        />
    );
}
