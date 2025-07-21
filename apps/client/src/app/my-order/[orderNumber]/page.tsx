'use client';

import { useParams } from 'next/navigation';

import HorizontalDivider from '@/components/common/Divider/Horizontal';
import OrderDetailPageHeader from '@/components/features/my-order/Header/OrderDetailPage';
import MyOrderItem from '@/components/features/my-order/MyOrderItem';
import OrderSummaryGroup from '@/components/features/my-order/OrderSummary/Group';
import { ORDER_PAGE_SUMMARY_CONFIGS } from '@/constants/order';
import { useOrderDetailQuery } from '@/hooks/queries/useOrderQuery';
import { useSummaryGroups } from '@/hooks/useSummaryGroups';

export default function MyOrderDetailPage() {
    const params = useParams<{ orderNumber: string }>();
    const { orderNumber } = params;

    const {
        data: orderedObjects,
        isLoading,
        error,
    } = useOrderDetailQuery(orderNumber);

    const summarySections = useSummaryGroups(
        orderedObjects,
        ORDER_PAGE_SUMMARY_CONFIGS
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!orderedObjects) return <div>No data</div>;

    return (
        <>
            <OrderDetailPageHeader serialNumber={orderedObjects.orderNumber} />
            <HorizontalDivider isViewportWidth height="3" />
            <div className="w-full px-5 py-6">
                {/* 주문 상품 Section */}
                <section className="mb-3 flex w-full flex-col gap-6">
                    <MyOrderItem
                        orderedObjects={orderedObjects.objects}
                        orderNumber={orderNumber} // 추후 orderedObjects.orderNumber로 수정
                    />
                    <HorizontalDivider color="gray-light" />
                </section>

                {/* 주문 Summary Section */}
                <section>
                    {summarySections.map(
                        ({ title, items, gap }) =>
                            items.length > 0 && (
                                <OrderSummaryGroup
                                    key={title}
                                    title={title}
                                    items={items}
                                    gap={gap}
                                />
                            )
                    )}
                </section>
            </div>
        </>
    );
}
