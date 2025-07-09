import { PRICE_MAX, PRICE_MIN } from '@/constants/filter';
import { PriceFilter, SelectedChipsMap } from '@/types/filter';

export function parseQueryParams(searchParams: URLSearchParams): {
    selectedChips: SelectedChipsMap;
    price: PriceFilter;
} {
    const selectedChips: SelectedChipsMap = {};
    const price: PriceFilter = { min: PRICE_MIN, max: PRICE_MAX };

    searchParams.forEach((value, key) => {
        if (key === 'priceMin' || key === 'priceMax') {
            price[key === 'priceMin' ? 'min' : 'max'] = Number(value);
        } else {
            if (!selectedChips[key]) selectedChips[key] = new Set();
            selectedChips[key].add(value);
        }
    });

    return { selectedChips, price };
}
