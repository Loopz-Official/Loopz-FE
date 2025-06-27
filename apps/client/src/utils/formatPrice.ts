export function formatPrice(price?: number | string) {
    if (price === undefined || price === null) return '';
    return Number(price).toLocaleString();
}
