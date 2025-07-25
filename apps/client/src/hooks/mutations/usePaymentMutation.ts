// 'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useUserInfoQuery } from '@/hooks/queries/useUserQuery';
import { OrderRequest, PlacedOrderObjectInfo } from '@/schemas/order';
import { currencyEnum } from '@/schemas/payment/enum';
import { getOrderDetail, placeOrder } from '@/services/api/order';
import { completePayment } from '@/services/api/payment/completePayment';
import { placePayment } from '@/services/api/payment/placePayment';
import { handleMutationError } from '@/utils/error/handleMutationError';

/**
 * - 결제는 주문 생성 및 결제 요청과 함께 atomic transaction으로 처리
 * - mutation hook의 onSuccess callback에서는 API direct call 후 주문 상세 캐싱 처리
 */
export const usePlaceOrderAndPaymentMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data: userInfo } = useUserInfoQuery();

    return useMutation({
        mutationFn: async (params: {
            orderRequest: OrderRequest;
            orderName: string;
            totalPrice: number;
        }) => {
            const { orderRequest, orderName, totalPrice } = params;

            try {
                // Step 1. 주문 생성
                const orderData = await placeOrder(orderRequest);

                // Step 2. 결제 customData 생성
                if (!userInfo) throw new Error('유저 정보가 없습니다.');

                const customData = {
                    userId: userInfo.userId,
                    orderId: orderData.orderId,
                    purchasedItems: orderData.objects.map(
                        (obj: PlacedOrderObjectInfo) => ({
                            productId: obj.objectId,
                            productName: obj.objectName,
                            quantity: obj.quantity,
                            price: obj.purchasePrice,
                            currency: currencyEnum.enum.CURRENCY_KRW,
                        })
                    ),
                };

                // Step 3. 결제 요청
                const paymentResponse = await placePayment({
                    orderName,
                    totalPrice,
                    customData,
                });

                // Step 4. 결제 응답 검증 및 취소/실패 방어
                if (
                    paymentResponse?.code !== undefined ||
                    !paymentResponse?.paymentId
                ) {
                    throw new Error(
                        paymentResponse?.message ||
                            '결제가 취소되었거나 실패했습니다.'
                    );
                }

                // Step 5. 결제 완료 처리
                await completePayment(paymentResponse.paymentId);

                return orderData;
            } catch (error) {
                // 에러 발생 시 상세 로깅
                console.error('Order and Payment process failed:', error);
                throw error;
            }
        },
        onSuccess: (orderData) => {
            // 주문 상세 캐싱
            queryClient.setQueryData(
                ['order-detail', orderData.orderId],
                orderData
            );

            router.push(`/order/complete?orderId=${orderData.orderId}`);
        },
        onError: handleMutationError,
    });
};

/**
 * 결제 완료 처리를 위한 mutation
 */
export const useCompletePaymentMutation = (orderId?: string) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (paymentId: string) => {
            // Step 1. 결제 완료 처리
            const paymentResult = await completePayment(paymentId);

            // Step 2. 주문 상세 데이터 조회 및 캐싱
            if (orderId) {
                try {
                    const orderDetail = await getOrderDetail(orderId);
                    queryClient.setQueryData(
                        ['order-detail', orderId],
                        orderDetail
                    );
                } catch (error) {
                    console.error(
                        'Failed to fetch order detail for caching:',
                        error
                    );
                    // 주문 상세 조회 실패해도 결제 완료는 성공으로 처리 (No error handling)
                }
            }

            return paymentResult;
        },
        onSuccess: () => {
            if (orderId) {
                router.replace(`/order/complete?orderId=${orderId}`);
            }
        },
    });
};
