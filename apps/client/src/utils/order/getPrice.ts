import { DELIVERY_FEE } from '@/constants/delivery';
import { ObjectInfo } from '@/schemas/object';

export function getProductPrice(products: ObjectInfo[]) {
    return products.reduce(
        (acc, product) => acc + product.objectPrice * product.quantity,
        0
    );
}

// 상품 합계와 최종 금액을 한 번에 계산
export function getPriceSummary(products: ObjectInfo[]) {
    const productPrice = getProductPrice(products);
    return {
        productPrice,
        totalPrice: productPrice + DELIVERY_FEE,
    };
}
