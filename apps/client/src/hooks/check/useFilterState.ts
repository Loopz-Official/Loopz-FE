import { useState } from 'react';

import { SortAndSoldOutOptions } from '@/schemas/object';

export function useFilterState<T extends SortAndSoldOutOptions>(defaults: T) {
    const [filters, setFilters] = useState<T>(defaults);

    const setFilter = <K extends keyof T>(key: K, value: T[K]) => {
        setFilters((f) => ({ ...f, [key]: value }));
    };

    return [filters, setFilter] as const;
}
