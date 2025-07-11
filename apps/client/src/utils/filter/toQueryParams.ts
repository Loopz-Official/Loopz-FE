import { PRICE_MAX, PRICE_MIN } from '@/constants/filter';
import { SelectedChipsMap } from '@/types/filter';

import { joinValuesWithComma } from './joinValuesWithComma';

export const toQueryParams = (
    selectedChips: SelectedChipsMap,
    price: { min: number; max: number }
): string => {
    const params = new URLSearchParams();

    Object.entries(selectedChips).forEach(([key, set]) => {
        const encodedValue = joinValuesWithComma(set);
        params.append(key, encodedValue);
    });

    if (price.min !== PRICE_MIN) params.append('priceMin', String(price.min));
    if (price.max !== PRICE_MAX) params.append('priceMax', String(price.max));

    const queryString = params.toString();
    console.log(queryString);

    return queryString ? `?${queryString}` : '';
};
