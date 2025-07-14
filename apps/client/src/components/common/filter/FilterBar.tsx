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
        <div className="my-1 flex w-full items-center justify-between bg-white px-5 py-3">
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

export default FilterBar;
