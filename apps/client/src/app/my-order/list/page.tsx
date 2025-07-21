'use client';

import { useState } from 'react';

import HorizontalDivider from '@/components/common/Divider/Horizontal';
import EmptyState from '@/components/common/Feedback/EmptyState';
import { TopTabBar } from '@/components/common/TabBar/TopTabBar';
import OrderHeader from '@/components/features/my-order/Header/Order';
import MyOrderItem from '@/components/features/my-order/MyOrderItem';
import { ORDER_LIST_TABS } from '@/constants/order/myOrder';
import { useOrderHistoryQuery } from '@/hooks/queries/useOrderQuery';

export default function MyOrderListPage() {
    const { data: orderHistory, isLoading, error } = useOrderHistoryQuery();

    const [selectedTab, setSelectedTab] = useState<string>(
        ORDER_LIST_TABS[0]?.key || 'ALL'
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!orderHistory) return <div>No data</div>;
    if (orderHistory.length === 0)
        return <EmptyState message="주문 내역이 없습니다." headerHeight={56} />;

    return (
        <>
            <TopTabBar
                tabs={ORDER_LIST_TABS}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <div className="px-5 py-6">
                <div className="flex flex-col gap-5">
                    {orderHistory.map((order) => (
                        <div
                            key={order.orderId}
                            className="flex flex-col gap-8"
                        >
                            <section className="flex flex-col gap-2.5">
                                <OrderHeader
                                    orderNumber={order.orderId} // 추후 orderNumber response DTO 추가 시 수정
                                    orderDate={order.orderDate}
                                />
                                <MyOrderItem
                                    key={order.orderId}
                                    orderedObjects={order.objects}
                                />
                            </section>
                            <HorizontalDivider color="gray-light" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
