import { Product } from '@/hooks/stores/useSelectedProductsStore';

export function getProductPrice(products: Product[]) {
    return products.reduce(
        (acc, product) => acc + product.objectPrice * product.quantity,
        0
    );
}

export function getTotalPrice(products: Product[]) {
    return getProductPrice(products) + 3000;
}
