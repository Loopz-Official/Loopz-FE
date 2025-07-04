import {
    CartItemInfo,
    ObjectIdArray,
    objectIdArraySchema,
} from '@/schemas/cart';

// 장바구니의 전체 상품 개수를 계산하는 함수
export function getCartItemCount(items: CartItemInfo[]): number {
    return items.reduce((acc, item) => acc + item.quantity, 0);
}

// 장바구니의 전체 상품 금액을 계산하는 함수
export function getCartTotalPrice(items: CartItemInfo[]): number {
    return items.reduce(
        (acc, item) => acc + item.object.objectPrice * item.quantity,
        0
    );
}

// 장바구니의 최종 결제 금액(상품 금액 + 배송비)을 계산하는 함수
export function getCartFinalPrice(
    totalPrice: number,
    deliveryFee: number = 3000
): number {
    return totalPrice + deliveryFee;
}

// apps/client/src/utils/cart/getObjectIdsFromCart.ts
export function getObjectIdsFromCart(cart: CartItemInfo[]): ObjectIdArray {
    const ids = cart.map((item) => item.object.objectId);
    objectIdArraySchema.safeParse(ids);
    return ids;
}
