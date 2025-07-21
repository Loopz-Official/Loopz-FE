'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import HorizontalDivider from '@/components/common/Divider/Horizontal';
import OrderDetailPageHeader from '@/components/features/my-order/Header/OrderDetailPage';
import MyOrderItem from '@/components/features/my-order/MyOrderItem';
import OrderSummaryGroup from '@/components/features/my-order/OrderSummary/Group';
import { useOrderDetailQuery } from '@/hooks/queries/useOrderQuery';
import { OrderSummaryItem } from '@/types/myOrder';
import {
    getBuyerInfoItems,
    getPaymentInfoItems,
} from '@/utils/my-order/summaryItems';

export default function MyOrderDetailPage() {
    const params = useParams<{ orderNumber: string }>();
    const { orderNumber } = params;

    const {
        data: orderedObjects,
        isLoading,
        error,
    } = useOrderDetailQuery(orderNumber);

    const buyerInfoItems: OrderSummaryItem[] = useMemo(() => {
        if (!orderedObjects) return [];
        return getBuyerInfoItems(orderedObjects);
    }, [orderedObjects]);

    const paymentInfoItems: OrderSummaryItem[] = useMemo(() => {
        if (!orderedObjects) return [];
        return getPaymentInfoItems(orderedObjects);
    }, [orderedObjects]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!orderedObjects) return <div>No data</div>;

    return (
        <>
            <OrderDetailPageHeader orderNumber={orderedObjects.orderNumber} />
            <HorizontalDivider isViewportWidth height="3" />
            <div className="w-full px-5 py-6">
                {/* 주문 상품 Section */}
                <section className="mb-3 flex w-full flex-col gap-6">
                    <MyOrderItem orderedObjects={orderedObjects.objects} />
                    <HorizontalDivider color="gray-light" />
                </section>

                {/* 주문 Summary Section */}
                <section>
                    {buyerInfoItems.length > 0 && (
                        <OrderSummaryGroup
                            title="구매자 정보"
                            items={buyerInfoItems}
                            gap={12}
                        />
                    )}
                    {paymentInfoItems.length > 0 && (
                        <OrderSummaryGroup
                            title="결제 내역"
                            items={paymentInfoItems}
                        />
                    )}
                </section>
            </div>
        </>
    );
}
