'use client';

import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';

export default function DetailBottomButton({
    isDisabled,
}: {
    isDisabled: boolean;
}) {
    const router = useRouter();

    return (
        <BottomButton
            text={'상세페이지 결제하기'}
            isDisabled={isDisabled}
            onClick={() => router.push('/order/confirm')}
        />
    );
}
