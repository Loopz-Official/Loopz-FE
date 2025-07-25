import clsx from 'clsx';

import { LIKE_TABS, LikeTab } from '@/constants/like';

interface LikeTabBarProps {
    selectedTab: LikeTab;
    setSelectedTab: (tab: LikeTab) => void;
}

export default function LikeTabBar({
    selectedTab,
    setSelectedTab,
}: LikeTabBarProps) {
    return (
        <div className="sticky top-14 z-50 grid w-full max-w-2xl grid-cols-2 bg-white">
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
    );
}
