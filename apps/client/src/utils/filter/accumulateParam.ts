import { FilterRecord, FilterType } from '@/schemas/object';

export const accumulateParams = (
    params: Partial<FilterRecord>,
    key: FilterType,
    value: string
): Partial<FilterRecord> => {
    let current = params[key];

    if (current === undefined) {
        current = value;
    } else if (Array.isArray(current)) {
        current.push(value);
    } else {
        current = [current as string, value];
    }

    params[key] = current;
    return params;
};
