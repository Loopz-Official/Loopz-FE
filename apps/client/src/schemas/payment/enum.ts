import { z } from 'zod/v4';

export const portOneOrderStatus = z.enum(['IDLE', 'PENDING', 'PAID', 'FAILED']);
export type PortOneOrderStatus = z.infer<typeof portOneOrderStatus>;

export const currencyEnum = z.enum(['CURRENCY_KRW']);
export type CurrencyEnum = z.infer<typeof currencyEnum>;

export const portOnePaymentMethod = z.enum([
    'CARD', // 신용카드
    'TRANSFER', // 계좌이체
    'VIRTUAL_ACCOUNT', // 가상계좌
    'MOBILE', // 휴대폰
    'EASY_PAY', // 간편결제
    'GIFT_CERTIFICATE', // 상품권
]);
