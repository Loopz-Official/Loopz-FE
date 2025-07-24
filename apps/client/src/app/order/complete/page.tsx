'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import BottomFixedButton from '@/components/common/Button/BottomFixed';
import PaymentMethodSection from '@/components/features/order/complete/PaymentMethod';
import OrderItemsSection from '@/components/features/order/OrderItemsSection';
import Header from '@/components/layouts/Header';
import { ORDER_NOTIFICATIONS } from '@/constants/order';
import { useCompletePaymentMutation } from '@/hooks/mutations/useCompletePaymentMutation';
import { useOrderDetailQuery } from '@/hooks/queries/useOrderQuery';
import { orderStatusEnum, paymentMethodEnum } from '@/schemas/order';

export default function OrderCompletePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') ?? '';
    const paymentId = searchParams.get('paymentId') ?? '';
    const code = searchParams.get('code') ?? '';
    const message = searchParams.get('message') ?? '';

    // 모든 훅은 최상단에서 호출
    const { data: orderInfos, isLoading, error } = useOrderDetailQuery(orderId);
    const {
        mutate: completePaymentMutate,
        isPending: isProcessing,
        isError: isProcessError,
        error: processError,
    } = useCompletePaymentMutation();

    useEffect(() => {
        // 결제 실패/취소 등 에러 상황에서는 mutation 실행하지 않음
        if (code || !paymentId) return;
        if (paymentId && orderId) {
            completePaymentMutate({ paymentId, orderId });
        }
    }, [code, paymentId, orderId, completePaymentMutate]);

    useEffect(() => {
        if (error) {
            router.push('/main');
        }
    }, [error, router]);

    // 렌더링 분기(에러 UI)
    if (code || !paymentId) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="mb-4 text-lg font-semibold text-red-600">
                    {message || '결제가 취소되었거나 실패했습니다.'}
                </div>
            </div>
        );
    }

    if (isProcessError) {
        return (
            <div>
                {processError instanceof Error
                    ? processError.message
                    : '결제 후처리에 실패했습니다.'}
            </div>
        );
    }

    if (isProcessing) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="mb-4 text-lg font-semibold">
                    결제 처리 중입니다...
                </div>
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <div className="pb-17">
            {error ? (
                <div>Error: {error.message}</div>
            ) : isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Header type="pop-up" title="주문완료" />

                    <div className="px-5">
                        {/* 아이콘 */}
                        <div className="mb-9 mt-12 flex flex-col items-center text-center">
                            <Image
                                priority
                                src={'/gift.svg'}
                                alt="gift"
                                width={160}
                                height={160}
                                className="mb-2"
                            />
                            <h3 className="text-body-01 font-semibold">
                                주문이 완료되었어요!
                            </h3>
                            <span className="text-caption-01 text-gray-dark font-semibold">
                                입금정보를 24시간 이내로 확인한 이후, 발송할
                                예정입니다.
                            </span>
                            <span className="text-caption-01 text-gray-regular mt-2.5">
                                평균 배송 소요 기간은 2-3일이며,
                                <br />
                                배송 현황은 마이페이지에서 조회 가능합니다.
                            </span>
                        </div>

                        {/* 주문 상품 */}
                        <div className="flex flex-col gap-3 border-t border-black pb-6 pt-3">
                            <OrderItemsSection
                                variant="complete"
                                items={orderInfos?.objects ?? []}
                            />
                        </div>

                        {/* 결제 수단 */}
                        <div className="pb-13 flex flex-col border-t border-black pt-3">
                            <PaymentMethodSection
                                paymentMethod={
                                    orderInfos?.paymentMethod ??
                                    paymentMethodEnum.enum.BANK_TRANSFER
                                }
                                status={orderStatusEnum.enum.ORDERED} // orderStatus Response DTO에 추가 요청 후 수정
                            />
                        </div>
                    </div>

                    {/* 푸터 */}
                    <footer className="border-gray-regular text-caption-02 text-gray-regular border-t p-5">
                        <ul className="list-disc space-y-4 pl-5">
                            {ORDER_NOTIFICATIONS.map((notification) => (
                                <li
                                    key={notification}
                                    className="marker:text-[10px]"
                                >
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    </footer>

                    <BottomFixedButton
                        text="다른 상품 둘러보러 가기"
                        isDisabled={false}
                        onClick={() => router.replace('/main')}
                    />
                </>
            )}
        </div>
    );
}
