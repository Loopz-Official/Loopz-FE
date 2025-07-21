import { OrderDetailResponse } from '@/schemas/order';

// 주문 내역 내 TabBar 타입
export interface OrderTab {
    key: string;
    label: string;
}

// 주문 내역 내 CTA 버튼 타입
export interface OrderActionButton {
    label: string;
    onClick: () => void;
}

// 주문 내역 내 Divider 삽입을 위한 enum 타입
export enum OrderSummaryItemType {
    ROW = 'row',
    DIVIDER = 'divider',
}

// label의 커스텀를 위한 타입
export type OrderSummaryContent = string | { text: string; className: string };

// OrderSummaryItem 타입 정의
export type OrderSummaryItem =
    | {
          type: OrderSummaryItemType.ROW;
          label: OrderSummaryContent;
          value: OrderSummaryContent;
      }
    | {
          type: OrderSummaryItemType.DIVIDER;
      };

// 상세 페이지 Summary Group 타입 정의
export interface SummaryGroupConfig {
    title: string;
    getItems: (data: OrderDetailResponse) => OrderSummaryItem[];
    gap?: number;
}
