'use client';

import { useState } from 'react';

import ObjectTab from '@/components/features/like/ObjectTab';
import SnapTab from '@/components/features/like/SnapTab';
import LikeTabBar from '@/components/features/like/TabBar';
import { LIKE_TABS, LikeTab } from '@/constants/like';

export default function LikePage() {
    const [selectedTab, setSelectedTab] = useState<LikeTab>(LIKE_TABS[0]);

    return (
        <>
            <LikeTabBar
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />

            {selectedTab === LIKE_TABS[0] ? <ObjectTab /> : <SnapTab />}
        </>
    );
}
