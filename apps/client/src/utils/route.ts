import { OrderFrom } from '@/constants/order';

export function getOrderFromQueryString(orderFrom?: OrderFrom) {
    return orderFrom ? `orderFrom=${orderFrom}` : '';
}
