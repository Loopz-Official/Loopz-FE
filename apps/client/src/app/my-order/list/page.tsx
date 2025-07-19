'use client';

import { useState } from 'react';

import { TopTabBar } from '@/components/common/TabBar/TopTabBar';
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

    return (
        <>
            <TopTabBar
                tabs={ORDER_LIST_TABS}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <div className="px-5 py-6">
                {orderHistory.map((order) => (
                    <MyOrderItem
                        key={order.orderId}
                        orderedObjects={order.objects}
                    />
                ))}
            </div>
        </>
    );
}
