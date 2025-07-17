'use client';

// import { useState } from 'react';

import Divider from '@/components/features/mypage/Divider';
import NoItem from '@/components/features/mypage/list/NoItem';
// import TabBar from '@/components/features/mypage/list/TabBar';
import ProductItemByDeliveryState from '@/components/features/mypage/ProductItemByDeliveryState';
import RefundPolicy from '@/components/features/mypage/return-form/RefundPolicy';
import Header from '@/components/layouts/Header';
// import { ORDER_LIST_TABS } from '@/constants/mypage';
import { useOrderHistoryQuery } from '@/hooks/queries/useOrderQuery';
import { formatDate } from '@/utils/formatDate';

export default function Page() {
    // const [selectedTab, setSelectedTab] = useState(ORDER_LIST_TABS[0]!.label);
    const { data: orders } = useOrderHistoryQuery();

    return (
        <div>
            <Header type="title" title="주문 내역" />
            {/* <TabBar
                tabs={ORDER_LIST_TABS}
                selectedTab={selectedTab}
                onClick={(tab) => setSelectedTab(tab)}
            /> */}

            {!orders || orders.length === 0 ? (
                <NoItem />
            ) : (
                orders.map((order) => (
                    <div key={order.orderId}>
                        <div className="space-y-4 px-5 py-6">
                            <div className="text-headline-04">
                                {formatDate(order.orderDate)}
                            </div>
                            <div className="space-y-5">
                                {order.objects.map((object) => (
                                    <ProductItemByDeliveryState
                                        key={object.objectId}
                                        type="order"
                                        object={object}
                                    />
                                ))}
                            </div>
                        </div>
                        <Divider />
                    </div>
                ))
            )}

            <div className="px-5 py-6">
                <RefundPolicy />
            </div>
        </div>
    );
}
