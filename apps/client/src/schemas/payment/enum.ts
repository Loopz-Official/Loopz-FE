import { z } from 'zod/v4';

// 결제 상태 (UI 처리를 위한 enum -> 추후 types로 분리)
export const paymentStatusEnum = z.enum(['IDLE', 'PENDING', 'PAID', 'FAILED']);
export type PaymentStatus = z.infer<typeof paymentStatusEnum>;

// 화폐 단위
export const currencyEnum = z.enum(['CURRENCY_KRW']);
export type CurrencyEnum = z.infer<typeof currencyEnum>;

// 나이스페이먼츠 결제 수단
export const nicePaymentsPayMethod = z.enum([
    'CARD', // 신용카드
    'TRANSFER', // 계좌이체
    'VIRTUAL_ACCOUNT', // 가상계좌
    'MOBILE', // 휴대폰
    'EASY_PAY', // 간편결제
    'GIFT_CERTIFICATE', // 상품권
]);
export type NicePaymentsPayMethod = z.infer<typeof nicePaymentsPayMethod>;
