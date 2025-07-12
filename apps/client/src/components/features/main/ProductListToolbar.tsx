'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';

// import { ChevronDownIcon } from '@/components/icons/ChevronDown';
import { FilterIcon } from '@/components/icons/Filter';

type ProductListToolbarProps = {
    productCount?: number;
    hasOrder?: boolean;
    hasFilter?: boolean;
};

export default function ProductListToolbar({
    productCount,
    // hasOrder = true,
    hasFilter = true,
}: ProductListToolbarProps) {
    // const [isRotated, setIsRotated] = useState(false);

    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const filterUrl = `/filter${queryString ? `?${queryString}` : ''}`;

    return (
        <div className="text-caption-01 text-gray-dark flex justify-between px-5 py-3">
            {hasFilter ? (
                <span>총 {productCount}개</span>
            ) : (
                <label className="flex w-fit items-center gap-2">
                    <input
                        type="checkbox"
                        className="border-gray-09 rounded-xs not-checked:bg-[url('/checkbox/unchecked.svg')] relative h-4 w-4 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checkbox/checked.svg')]"
                    />
                    <span className="cursor-pointer">품절제외</span>
                </label>
            )}
            <div className="flex gap-4">
                {/* {hasOrder && (
                    <button
                        className="flex items-center"
                        onClick={() => setIsRotated(!isRotated)}
                    >
                        최신순
                        <ChevronDownIcon
                            className={`h-4 w-4 text-black transition-transform duration-200 ${isRotated ? 'rotate-180' : ''}`}
                        />
                    </button>
                )} */}
                {hasFilter && (
                    <Link
                        href={filterUrl}
                        className="flex items-center gap-0.5"
                    >
                        필터
                        <FilterIcon className="h-4 w-4" />
                    </Link>
                )}
            </div>
        </div>
    );
}
