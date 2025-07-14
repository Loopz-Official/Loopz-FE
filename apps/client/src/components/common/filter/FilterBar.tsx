import SoldoutFilter from './unit/SoldoutFilter';
import SortSelector from './unit/SortSelector';

type FilterBarProps = {
    hasSort?: boolean;
};

const FilterBar = ({ hasSort = false }: FilterBarProps) => {
    return (
        <div className="my-1 flex w-full items-center justify-between px-5 py-3">
            <SoldoutFilter />
            {hasSort && <SortSelector />}
        </div>
    );
};

export default FilterBar;
