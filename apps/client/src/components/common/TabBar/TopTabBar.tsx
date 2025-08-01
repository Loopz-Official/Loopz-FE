import clsx from 'clsx';

import { OrderTab } from '@/types/myOrder';

interface TopTabBarProps {
    tabs: OrderTab[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    renderLabel?: (label: string) => React.ReactNode;
    className?: string;
}

export function TopTabBar({
    tabs,
    activeTab,
    setActiveTab,
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
                    onClick={() => setActiveTab(tab.key)}
                    className={clsx(
                        'text-body-03 flex-1 justify-center border-b py-4 tracking-normal',
                        activeTab === tab.key
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
