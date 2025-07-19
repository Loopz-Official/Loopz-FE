import { z } from 'zod/v4';

// 주문 상태
export const orderStatusEnum = z.enum([
    'PENDING',
    'ORDERED',
    'SHIPPING',
    'DELIVERED',
    'CANCELED', // 추후 삭제할 enum 값
    'CANCEL_REQUESTED',
    'CANCEL_COMPLETE',
    'REFUND_REQUESTED',
    'REFUND_COMPLETE',
]);
export type OrderStatusEnum = z.infer<typeof orderStatusEnum>;

// 결제 방식
export const paymentMethodEnum = z.enum(['BANK_TRANSFER', 'CREDIT_CARD']);
export type PaymentMethodEnum = z.infer<typeof paymentMethodEnum>;
