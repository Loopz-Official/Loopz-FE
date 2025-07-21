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
                className: 'text-body-01 text-point',
            },
        },
        {
            type: OrderSummaryItemType.ROW,
            label: '결제 수단',
            value: PAYMENT_METHOD_LABEL_MAP[orderedObjects.paymentMethod],
        },
    ];
}
