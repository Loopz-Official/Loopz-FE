import PortOne, { PaymentRequest } from '@portone/browser-sdk/v2';

import { currencyEnum, nicePaymentsPayMethod } from '@/schemas/payment/enum';
import { paymentRequest } from '@/schemas/payment/request';
import { validate } from '@/schemas/utils/validate';
import { getRequiredEnv } from '@/utils/getRequiredEnv';
import { getRandomId } from '@/utils/order/getRandomId';

import { PlacePaymentParams } from './types';

/**
 * PortOne SDK를 사용한 결제 요청 API
 * 내부적으로 PortOne.requestPayment() SDK 함수를 호출합니다.
 */
export async function placePayment({
    orderName,
    totalPrice,
    customData,
}: PlacePaymentParams) {
    const storeId = getRequiredEnv('NEXT_PUBLIC_PORTONE_STORE_ID');
    const channelKey = getRequiredEnv('NEXT_PUBLIC_NICE_PAYMENTS_CHANNEL_ID');

    const paymentId = getRandomId();

    const payment: PaymentRequest = {
        storeId,
        channelKey,
        paymentId,
        orderName,
        totalAmount: totalPrice,
        currency: currencyEnum.enum.CURRENCY_KRW,
        payMethod: nicePaymentsPayMethod.enum.CARD, // 추후 결제수단 선택 옵션 추가 가능 (현재는 신용카드 결제만 지원)
        customData,
    };

    const validatedPaymentRequest = validate(
        paymentRequest,
        payment,
        'PortOne Payment Request'
    );

    try {
        // SDK 내에 이미 타입 정의되어있음
        const response = await PortOne.requestPayment(validatedPaymentRequest);

        // console.log('PortOne Payment Response: ', response);

        return {
            code: response?.code,
            message: response?.message,
            paymentId: response?.paymentId,
            pgCode: response?.pgCode,
            pgMessage: response?.pgMessage,
            transactionType: response?.transactionType,
            txId: response?.txId,
        };
    } catch (error) {
        console.error('Error requesting payment:', error);
        throw error;
    }
}
