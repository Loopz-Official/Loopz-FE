import clsx from 'clsx';

import { Tab } from '@/constants/order/myOrder';

type TopTabBarProps = {
    tabs: Tab[];
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
    renderLabel?: (label: string) => React.ReactNode;
    className?: string;
};

export function TopTabBar({
    tabs,
    selectedTab,
    setSelectedTab,
    renderLabel = (label) => label,
    className,
}: TopTabBarProps) {
    return (
        <div
            className={clsx(
                'sticky top-14 z-50 flex w-full max-w-2xl bg-white',
                className
            )}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={clsx(
                        'text-body-03 flex-1 justify-center border-b py-4 tracking-normal',
                        selectedTab === tab.key
                            ? 'border-black font-semibold'
                            : 'text-disabled border-disabled font-normal'
                    )}
                >
                    {renderLabel(tab.label)}
                </button>
            ))}
        </div>
    );
}
