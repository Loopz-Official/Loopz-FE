import { OrderStatusEnum, PaymentMethodEnum } from '@/schemas/order';

export type OrderFrom = 'cart' | 'detail';
export type OrderItemVariant = 'form' | 'complete';

export type OrderStatusMetadata = {
    label: string;
    textColor: string;
};

export const ORDER_NOTIFICATIONS = [
    "본 제품은 리사이클링 제품 특성상, 수령 이후의 환불은 '주문한 제품과 다른 제품으로 오배송된 경우'를 제외하고는 불가능합니다. 제품 상태에 관련한 정보는 상세페이지와 이미지를 참고하여 미리 확인 부탁드립니다.",
    '오배송으로 인한 환불 문의가 필요할 경우 1:1 문의하기를 통한 문의를 부탁드립니다.',
];

export const PAYMENT_METHOD_LABEL_MAP: Record<PaymentMethodEnum, string> = {
    BANK_TRANSFER: '계좌이체',
    NICE_PAY: '나이스 페이먼츠',
};

export const ORDER_STATUS_META_MAP: Record<
    OrderStatusEnum,
    OrderStatusMetadata
> = {
    PENDING: {
        label: '결제 대기',
        textColor: 'text-gray-05',
    },
    FAILED: {
        label: '결제 실패',
        textColor: 'text-status-red',
    },
    ORDERED: {
        label: '결제 완료',
        textColor: 'text-status-blue',
    },
    DELIVERY_READY: {
        label: '배송 준비',
        textColor: 'text-status-blue',
    },
    SHIPPING: {
        label: '배송중',
        textColor: 'text-status-blue',
    },
    DELIVERED: {
        label: '배송 완료',
        textColor: 'text-status-blue',
    },
    PURCHASE_CONFIRMED: {
        label: '구매 확정',
        textColor: 'text-status-blue',
    },
    CANCEL_REQUESTED: {
        label: '취소 요청',
        textColor: 'text-gray-04',
    },
    CANCEL_COMPLETE: {
        label: '취소 완료',
        textColor: 'text-gray-04',
    },
    REFUND_REQUESTED: {
        label: '반품 요청',
        textColor: 'text-gray-04',
    },
    REFUND_COMPLETE: {
        label: '반품 완료',
        textColor: 'text-gray-04',
    },
};
