'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useCompletePaymentMutation } from '@/hooks/mutations/usePaymentMutation';

export default function PaymentRedirectPage() {
    const searchParams = useSearchParams();

    const orderId = searchParams.get('orderId') ?? '';
    const paymentId = searchParams.get('paymentId') ?? '';
    const code = searchParams.get('code') ?? '';
    const message = searchParams.get('message') ?? '';

    const {
        mutate: completePaymentMutate,
        isPending,
        isError,
        error,
    } = useCompletePaymentMutation(orderId);

    // 포트원 서버로의 결제 요청 후 애플리케이션 서버로 결제 완료 API 요청
    useEffect(() => {
        if (code || !paymentId) return;
        if (paymentId && orderId) {
            completePaymentMutate(paymentId);
        }
    }, [code, paymentId, orderId, completePaymentMutate]);

    if (isPending) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="mb-4 text-lg font-semibold">결제 처리중...</div>
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                {error instanceof Error
                    ? error.message
                    : '결제 처리에 실패했습니다.'}
            </div>
        );
    }

    // code(실패)나 paymentId 없음 등 예외 상황
    if (code || !paymentId) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="mb-4 text-lg font-semibold text-red-600">
                    {message || '결제가 취소되었거나 실패했습니다.'}
                </div>
            </div>
        );
    }

    return null;
}
