import { PAYMENT_METHOD_LABEL_MAP } from '@/constants/order';
import { OrderDetailResponse } from '@/schemas/order';
import { OrderSummaryItem, OrderSummaryItemType } from '@/types/myOrder';
import { formatPrice } from '@/utils/formatPrice';

export function getBuyerInfoItems(
    orderedObjects: OrderDetailResponse
): OrderSummaryItem[] {
    return [
        {
            type: OrderSummaryItemType.ROW,
            label: '주문자',
            value: orderedObjects.address.recipientName,
        },
        {
            type: OrderSummaryItemType.ROW,
            label: '휴대폰 번호',
            value: orderedObjects.address.phoneNumber,
        },
        {
            type: OrderSummaryItemType.ROW,
            label: '배송지',
            value: `[${orderedObjects.address.zoneCode}] ${orderedObjects.address.address} ${orderedObjects.address.addressDetail}`,
        },
    ];
}

export function getPaymentInfoItems(
    orderedObjects: OrderDetailResponse
): OrderSummaryItem[] {
    return [
        {
            type: OrderSummaryItemType.ROW,
            label: '상품 금액',
            value: `${formatPrice(orderedObjects.totalProductPrice)}원`,
        },
        {
            type: OrderSummaryItemType.ROW,
            label: '배송비',
            value: `${formatPrice(orderedObjects.shippingFee)}원`,
        },
        { type: OrderSummaryItemType.DIVIDER },
        {
            type: OrderSummaryItemType.ROW,
            label: {
                text: '총 결제 금액',
                className: 'text-body-01 text-black',
            },
            value: {
                text: `${formatPrice(orderedObjects.totalPayment)}원`,
                className: 'text-body-01 text-point font-semibold',
            },
        },
        {
            type: OrderSummaryItemType.ROW,
            label: '결제 수단',
            value: PAYMENT_METHOD_LABEL_MAP[orderedObjects.paymentMethod],
        },
    ];
}

// 취소/반품 상세 정보
export const getCancelOrReturnDetailItems =
    () // orderedObjects: OrderDetailResponse
    : OrderSummaryItem[] => {
        return [
            {
                type: OrderSummaryItemType.ROW,
                label: '신청 일시',
                value: '2025-07-09 17:15:15',
            },
            {
                type: OrderSummaryItemType.ROW,
                label: '사유',
                value: '상품이 설명과 다름',
            },
        ];
    };

// 환불 정보
export function getRefundInfoItems(
    orderedObjects: OrderDetailResponse
): OrderSummaryItem[] {
    return [
        {
            type: OrderSummaryItemType.ROW,
            label: {
                text: '총 환불 금액',
                className: 'text-body-01 text-black',
            },
            value: {
                text: `${formatPrice(orderedObjects.totalPayment)}원`,
                className: 'text-body-01 text-point font-semibold',
            },
        },
        {
            type: OrderSummaryItemType.ROW,
            label: '환불 수단',
            value: '계좌이체',
        },
        {
            type: OrderSummaryItemType.ROW,
            label: '환불 예정일',
            value: '영업일 기준 3~5일 이내',
        },
    ];
}
