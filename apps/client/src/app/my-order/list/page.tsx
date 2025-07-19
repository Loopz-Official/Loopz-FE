'use client';

import { useState } from 'react';

import { TopTabBar } from '@/components/common/TabBar/TopTabBar';
import MyOrderItem from '@/components/features/my-order/MyOrderItem';
import OrderHeader from '@/components/features/my-order/OrderHeader';
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
                                    orderId={order.orderId}
                                    orderDate={order.orderDate}
                                />
                                <MyOrderItem
                                    key={order.orderId}
                                    orderedObjects={order.objects}
                                />
                            </section>
                            <hr className="bg-gray-regular h-0.5 w-full border-none" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
