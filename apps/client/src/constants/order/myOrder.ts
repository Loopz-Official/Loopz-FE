import { SummaryGroupConfig } from '@/types/myOrder';
import * as U from '@/utils/my-order/summaryItems';

export const ORDER_LIST_TABS = [
    { key: 'ALL', label: '전체' },
    { key: 'ORDERED', label: '배송준비' },
    { key: 'SHIPPING', label: '배송중' },
    { key: 'DELIVERED', label: '배송완료' },
];

export const CS_HISTORY_TABS = [
    { key: 'CANCEL', label: '결제 취소' },
    { key: 'RETURN', label: '반품 접수' },
];

export const ORDER_CTA_HANDLERS = {
    cancel: () => {
        // 결제 취소
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

// 주문 상세 페이지 Summary Config
export const ORDER_PAGE_SUMMARY_CONFIGS: SummaryGroupConfig[] = [
    {
        title: '구매자 정보',
        getItems: U.getBuyerInfoItems,
    },
    {
        title: '결제 내역',
        getItems: U.getPaymentInfoItems,
    },
];

// 취소/반품 상세 페이지 Summary Config
export const REVERSAL_PAGE_SUMMARY_CONFIGS: SummaryGroupConfig[] = [
    {
        title: '결제 정보',
        getItems: U.getPaymentInfoItems,
    },
    {
        title: '취소/반품 정보',
        getItems: U.getCancelOrReturnDetailItems,
        gap: 12,
    },
    {
        title: '환불 정보',
        getItems: U.getRefundInfoItems,
    },
];
