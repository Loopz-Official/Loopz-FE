'use client';

import clsx from 'clsx';

export default function TabBar({
    tabs,
    selectedTab,
    onClick,
}: {
    tabs: { label: string; value: string }[];
    selectedTab: string;
    onClick: (tab: string) => void;
}) {
    return (
        <div className="flex">
            {tabs.map((tab) => (
                <button
                    onClick={() => onClick(tab.label)}
                    key={tab.label}
                    className={clsx(
                        'text-body-03 flex-1 border-b py-2.5',
                        tab.label === selectedTab
                            ? 'border-black font-semibold'
                            : 'border-button-gray-regular text-gray-regular font-normal'
                    )}
                >
                    {tab.value}
                </button>
            ))}
        </div>
    );
}
