import { z } from 'zod/v4';

// 주문 상태
export const orderStatusEnum = z.enum([
    'PENDING', // 주문 생성 후 결제 대기 상태
    'FAILED', // 결제 실패 (잔액 부족 or 네트워크 에러 등)
    'ORDERED', // 결제 완료
    'DELIVERY_READY', // 배송 준비
    'SHIPPING', // 배송중
    'DELIVERED', // 배송 완료
    'PURCHASE_CONFIRMED', // 구매 확정
    'CANCEL_REQUESTED', // 결제 취소 요청
    'CANCEL_COMPLETE', // 결제 취소 완료
    'REFUND_REQUESTED', // 환불(반품) 요청 -> 추후 RETURN 키워드로 변경 요청
    'REFUND_COMPLETE', // 환불(반품) 완료
]);
export type OrderStatusEnum = z.infer<typeof orderStatusEnum>;

/**
 * 결제 방식
 * - 추후 나이스페이먼츠 결제 수단에 따라서 정의 필요
 * - 현재는 신용카드 결제만 지원
 */
export const paymentMethodEnum = z.enum(['BANK_TRANSFER', 'NICE_PAY']);
export type PaymentMethodEnum = z.infer<typeof paymentMethodEnum>;
