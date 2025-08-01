export const ORDER_LIST_STATUS = [
    {
        label: 'PENDING',
        value: '주문 대기',
        button: '',
    },
    {
        label: 'ORDERED',
        value: '배송 준비',
        button: '주문 취소',
    },
    {
        label: 'SHIPPING',
        value: '배송 중',
        button: '배송 조회',
    },
    {
        label: 'DELIVERED',
        value: '배송 완료',
        button: '구매 확정',
    },
    {
        label: 'PURCHASE_CONFIRMED',
        value: '구매 확정',
        button: '',
    },
];

export const RETURN_LIST_STATUS = [
    {
        label: 'CANCELED_REQUESTED',
        value: '주문 취소 요청',
    },
    {
        label: 'CANCELED_COMPLETE',
        value: '주문 취소',
    },
    {
        label: 'REFUND_REQUESTED',
        value: '반품/환불 요청',
    },
    {
        label: 'REFUND_COMPLETE',
        value: '환불 완료',
    },
];
