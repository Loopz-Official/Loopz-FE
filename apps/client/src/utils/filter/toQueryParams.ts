import { PRICE_MAX, PRICE_MIN } from '@/constants/filter';
import { SelectedChipsMap } from '@/types/filter';

import { encodeValuesWithComma } from './encodeValuesWithComma';

export const toQueryParams = (
    selectedChips: SelectedChipsMap,
    price: { min: number; max: number }
): string => {
    const params: string[] = [];

    Object.entries(selectedChips).forEach(([key, set]) => {
        const encodedValue = encodeValuesWithComma(set);
        params.push(`${key}=${encodedValue}`);
    });

    if (price.min !== PRICE_MIN) params.push(`priceMin=${price.min}`);
    if (price.max !== PRICE_MAX) params.push(`priceMax=${price.max}`);

    // console.log(params);

    return params.length ? `?${params.join('&')}` : '';
};
