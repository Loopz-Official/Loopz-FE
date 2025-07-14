// 'use client';

// import { useState } from 'react';

import { ObjectSort } from '@/schemas/object';

interface SortSelectorProps {
    sort: ObjectSort;
    onChangeSort: (v: ObjectSort) => void;
}

const SortSelector = ({ sort, onChangeSort }: SortSelectorProps) => {
    // const [isRotated, setIsRotated] = useState<boolean>(false);

    return (
        <>
            <select
                className="rounded border p-1 text-sm"
                value={sort}
                onChange={(e) => onChangeSort(e.target.value as ObjectSort)}
            >
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
            </select>

            {/* <button
                className="text-caption-01 text-gray-dark flex items-center"
                onClick={() => setIsRotated(!isRotated)}
            >
                최신순
                <ChevronDownIcon
                    className={clsx(
                        'h-4 w-4 text-black transition-transform duration-200',
                        isRotated ? 'rotate-180' : ''
                    )}
                />
            </button> */}
        </>
    );
};

export default SortSelector;
