'use client';

import clsx from 'clsx';
import { useState } from 'react';

import ObjectTab from './ObjectTab';
import SnapTab from './SnapTab';

export const LIKE_TABS = ['OBJECT', 'SNAP'];

export default function TabBar() {
    const [selectedTab, setSelectedTab] = useState(LIKE_TABS[0]);

    return (
        <div>
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

            {selectedTab === 'OBJECT' ? <ObjectTab /> : <SnapTab />}
        </div>
    );
}
