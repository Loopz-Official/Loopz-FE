'use client';

import { useState } from 'react';

import TabBar from '@/components/features/mypage/list/TabBar';
import Header from '@/components/layouts/Header';
import { RETURN_LIST_TABS } from '@/constants/mypage';

export default function Page() {
    const [selectedTab, setSelectedTab] = useState(RETURN_LIST_TABS[0]!.label);

    return (
        <div>
            <Header type="title" title="취소/반품 내역" />
            <TabBar
                tabs={RETURN_LIST_TABS}
                selectedTab={selectedTab}
                onClick={(tab) => setSelectedTab(tab)}
            />

            <div className="text-body-03 fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center font-normal">
                아직 준비 중인 서비스입니다.
            </div>
            {/* {[[0, 1], [2], [3]].map((arr) => (
                <div key={arr[0]}>
                    <div className="space-y-4 px-5 py-6">
                        <div className="text-headline-04">2025.04.25</div>
                        <div className="space-y-5">
                            {arr.map((item) => (
                                <ProductItemByDeliveryState
                                    key={item}
                                    type="return"
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
