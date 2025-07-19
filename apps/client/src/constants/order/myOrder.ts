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
