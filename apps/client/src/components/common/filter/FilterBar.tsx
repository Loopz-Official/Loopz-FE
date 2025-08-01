import { memo } from 'react';

import { ObjectSort, SortAndSoldOutOptions } from '@/schemas/object';

import SoldoutFilter from './unit/SoldoutFilter';
import SortSelector from './unit/SortSelector';

interface FilterBarProps {
    excludeSoldOut: boolean;
    sort?: ObjectSort;
    onChangeFilter: (
        key: keyof SortAndSoldOutOptions,
        value: SortAndSoldOutOptions[keyof SortAndSoldOutOptions]
    ) => void;
}

const FilterBar = ({
    excludeSoldOut,
    sort,
    onChangeFilter,
}: FilterBarProps) => {
    return (
        <div className="border-gray-regular bg-gray-13 z-100 sticky top-14 flex w-full items-center justify-between border-b border-t px-5 py-4">
            <SoldoutFilter
                value={excludeSoldOut}
                onChange={(v) => onChangeFilter('excludeSoldOut', v)}
            />
            {sort && (
                <SortSelector
                    sort={sort}
                    onChangeSort={(v: ObjectSort) => onChangeFilter('sort', v)}
                />
            )}
        </div>
    );
};

export default memo(FilterBar);
