'use client';
// import Link from 'next/link';
// import { useState } from 'react';

// import { ChevronDownIcon } from '@/components/icons/ChevronDown';
// import { FilterIcon } from '@/components/icons/Filter';

export default function ProductListToolbar() {
    // const [isRotated, setIsRotated] = useState(false);

    return (
        <div className="text-caption-01 text-gray-dark flex justify-between py-3">
            <span>총 65개</span>
            {/* <div className="flex gap-4">
                <button
                    className="flex items-center"
                    onClick={() => setIsRotated(!isRotated)}
                >
                    최신순
                    <ChevronDownIcon
                        className={`h-4 w-4 text-black transition-transform duration-200 ${isRotated ? 'rotate-180' : ''}`}
                    />
                </button>
                <Link href={'/filter'} className="flex items-center gap-0.5">
                    필터
                    <FilterIcon className="h-4 w-4" />
                </Link>
            </div> */}
        </div>
    );
}
