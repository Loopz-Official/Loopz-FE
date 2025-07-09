import { PRICE_MAX, PRICE_MIN } from '@/constants/filter';
import { SelectedChipsMap } from '@/types/filter';

export const toQueryParams = (
    selectedChips: SelectedChipsMap,
    price: { min: number; max: number }
): string => {
    const params: string[] = [];
    Object.entries(selectedChips).forEach(([key, set]) => {
        set.forEach((value) => {
            params.push(`${key}=${value}`);
        });
    });
    if (price.min !== PRICE_MIN) params.push(`priceMin=${price.min}`);
    if (price.max !== PRICE_MAX) params.push(`priceMax=${price.max}`);
    return params.length ? `?${params.join('&')}` : '';
};
