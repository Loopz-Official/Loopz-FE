'use client';

import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';

// import { ChevronDownIcon } from '@/components/icons/ChevronDown';
import FilterEntryLink from '@/components/common/filter/unit/FilterEntryButton';

type ProductListToolbarProps = {
    productCount?: number;
};

export default function ProductListToolbar({
    productCount,
}: ProductListToolbarProps) {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const filterUri = `/filter${queryString ? `?${queryString}` : ''}`;

    return (
        <div className="text-caption-01 text-gray-dark flex justify-between px-5 py-3">
            <span>총 {productCount}개</span>
            <div className="flex gap-4">
                {/* <SortSelector /> */}
                <FilterEntryLink filterUri={filterUri} />
            </div>
        </div>
    );
}
