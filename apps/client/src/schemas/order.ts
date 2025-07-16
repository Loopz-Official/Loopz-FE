import * as z from 'zod/v4';

import { cartObjectInfo, objectInfo } from './object';

// Enum
export const paymentMethodEnum = z.enum(['BANK_TRANSFER', 'CREDIT_CARD']);
export type PaymentMethodEnum = z.infer<typeof paymentMethodEnum>;
export const paymentMethod = z.optional(paymentMethodEnum);
export type PaymentMethod = z.infer<typeof paymentMethod>;

export const orderStatusEnum = z.enum([
    'PENDING',
    'ORDERED',
    'SHIPPING',
    'DELIVERED',
    'CANCELED',
]);
export type OrderStatusEnum = z.infer<typeof orderStatusEnum>;
export const orderStatus = z.optional(orderStatusEnum);
export type OrderStatus = z.infer<typeof orderStatus>;

/*
 * Request Schema
 */
// 선택한 상품 정보 (POST 요청을 위한 key 값)
export const selectedProductInfo = z.object({
    objectId: z.uuid(),
    quantity: z.int32().positive(),
});
export type SelectedProductInfo = z.infer<typeof selectedProductInfo>;

// 주문 요청 schema
export const orderRequest = z.object({
    objects: z.array(selectedProductInfo),
    addressId: z.uuid(),
    paymentMethod,
    deliveryRequest: z.optional(z.string()),
    agreedToTerms: z.boolean(),
});
export type OrderRequest = z.infer<typeof orderRequest>;

export const baseOrderRequest = z.object({
    addressId: z.optional(z.uuid()),
    paymentMethod,
    deliveryRequest: z.string(),
    agreedToTerms: z.boolean(),
});
export type BaseOrderRequest = z.infer<typeof baseOrderRequest>;

// 상세보기에서 주문
export const detailOrderRequest = z.object({
    ...baseOrderRequest.shape,
    quantity: z.int32().nonnegative(),
});
export type DetailOrderRequest = z.infer<typeof detailOrderRequest>;

// 장바구니에서 주문
export const cartOrderRequest = z.object({
    ...baseOrderRequest.shape,
    objectIds: z.array(z.uuid()),
});
export type CartOrderRequest = z.infer<typeof cartOrderRequest>;

// Response Schema
export const orderedObjectInfo = z.object({
    ...objectInfo.omit({ objectPrice: true }).shape,
    purchasePrice: z.int32().nonnegative(),
});
export type OrderedObjectInfo = z.infer<typeof orderedObjectInfo>;

export const orderResponse = z.object({
    orderId: z.uuid(),
    paymentMethod: paymentMethodEnum,
    objects: z.array(orderedObjectInfo),
    shippingFee: z.int32().nonnegative(),
    totalProductPrice: z.int32().nonnegative(),
    totalPayment: z.int32().nonnegative(),
});

export type OrderResponse = z.infer<typeof orderResponse>;

// 주문 내역 조회 schema
export const orderInfos = z.object({
    orderId: z.uuid(),
    objects: z.array(
        z.object({
            ...cartObjectInfo.omit({ objectPrice: true }).shape,
            intro: z.string(),
            status: orderStatusEnum,
            orderDate: z.date(),
        })
    ),
});
export type OrderInfos = z.infer<typeof orderInfos>;

export const orderHistory = z.array(orderInfos);
export type OrderHistory = z.infer<typeof orderHistory>;
