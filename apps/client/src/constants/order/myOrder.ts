export interface Tab {
    key: string;
    label: string;
}

export const ORDER_LIST_TABS: Tab[] = [
    { key: 'ALL', label: '전체' },
    { key: 'ORDERED', label: '배송준비' },
    { key: 'SHIPPING', label: '배송중' },
    { key: 'DELIVERED', label: '배송완료' },
];

export const ORDER_CTA_HANDLERS = {
    cancel: () => {
        // 주문 취소
        /* ... */
    },
    track: () => {
        // 배송 조회
        /* ... */
    },
    confirm: () => {
        // 구매 확정
        /* ... */
    },
    return: () => {
        // 반품 신청
        /* ... */
    },
};
