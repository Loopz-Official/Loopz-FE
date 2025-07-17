'use client';

import { useState } from 'react';

import NoItem from '@/components/features/mypage/list/NoItem';
import TabBar from '@/components/features/mypage/list/TabBar';
import Header from '@/components/layouts/Header';
import { ORDER_LIST_TABS } from '@/constants/mypage';

export default function Page() {
    const [selectedTab, setSelectedTab] = useState(ORDER_LIST_TABS[0]!.label);

    return (
        <div>
            <Header type="title" title="주문 내역" />
            <TabBar
                tabs={ORDER_LIST_TABS}
                selectedTab={selectedTab}
                onClick={(tab) => setSelectedTab(tab)}
            />

            <NoItem />
            {/* {[[0, 1], [2], [3]].map((arr) => (
                    <div key={arr[0]}>
                        <div className="space-y-4 px-5 py-6">
                            <div className="text-headline-04">2025.04.25</div>
                            <div className="space-y-5">
                                {arr.map((item) => (
                                    <ProductItemByDeliveryState
                                        key={item}
                                        type="order"
                                    />
                                ))}
                            </div>
                        </div>
                        <Divider />
                    </div>
                ))} */}
        </div>
    );
}
