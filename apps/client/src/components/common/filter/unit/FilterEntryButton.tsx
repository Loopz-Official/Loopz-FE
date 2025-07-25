import Link from 'next/link';

import { FilterIcon } from '@/icons/Filter';

const FilterEntryLink = ({ filterUri }: { filterUri: string }) => {
    return (
        <Link href={filterUri} className="flex items-center gap-0.5">
            필터
            <FilterIcon className="h-4 w-4" />
        </Link>
    );
};

export default FilterEntryLink;
