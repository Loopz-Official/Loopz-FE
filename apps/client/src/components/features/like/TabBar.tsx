'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { LIKE_TABS, LikeTab } from '@/constants/like';

import ObjectTab from './ObjectTab';
import SnapTab from './SnapTab';

export default function LikeTabBar() {
    const [selectedTab, setSelectedTab] = useState<LikeTab>(LIKE_TABS[0]);

    return (
        <div className="fixed top-14 z-20 w-full max-w-2xl">
            <div className="grid grid-cols-2">
                {LIKE_TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={clsx(
                            'text-body-03 w-full justify-center border-b py-3 tracking-normal',
                            selectedTab === tab
                                ? 'border-black font-semibold'
                                : 'text-disabled border-disabled font-normal'
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {selectedTab === LIKE_TABS[0] ? <ObjectTab /> : <SnapTab />}
        </div>
    );
}
