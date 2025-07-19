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
    CREDIT_CARD: '신용카드',
};

export const ORDER_STATUS_META_MAP: Record<
    OrderStatusEnum,
    OrderStatusMetadata
> = {
    PENDING: {
        label: '주문 대기',
        textColor: 'text-status-blue',
    },
    ORDERED: {
        label: "주문 완료 ( 24시간 이내의 입금 확인이 정상적으로 처리되면, 주문 상태가 '배송중'으로 변경됩니다. )",
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
    CANCELED: {
        label: '주문취소',
        textColor: 'text-gray-04',
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
