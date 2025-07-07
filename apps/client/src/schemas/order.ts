import * as z from 'zod/v4';

import { objectBasicInfo } from './object';

// Enum
export const paymentMethodEnum = z.enum(['BANK_TRANSFER', 'CREDIT_CARD']);
export type PaymentMethodEnum = z.infer<typeof paymentMethodEnum>;
export const paymentMethod = z.optional(paymentMethodEnum);
export type PaymentMethod = z.infer<typeof paymentMethod>;

const orderStatusEnum = z.enum([
    'PENDING',
    'ORDERED',
    'SHIPPING',
    'DELIVERED',
    'CANCELED',
]);
export type OrderStatusEnum = z.infer<typeof orderStatusEnum>;
export const orderStatus = z.optional(orderStatusEnum);
export type OrderStatus = z.infer<typeof orderStatus>;

// Request Schema

export const selectedProduct = z.object({
    ...objectBasicInfo.shape,
    quantity: z.int32().nonnegative(),
});

export type SelectedProduct = z.infer<typeof selectedProduct>;

export const baseOrderRequest = z.object({
    addressId: z.optional(z.uuid()),
    paymentMethod,
    deliveryRequest: z.optional(z.string()),
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

const orderedObjectInfo = z.object({
    ...selectedProduct.shape,
    totalPrice: z.int32().nonnegative(),
});
export type OrderedObjectInfo = z.infer<typeof orderedObjectInfo>;

// Response Schema

export const orderResponse = z.object({
    orderId: z.uuid(),
    status: orderStatus,
    paymentMethod: paymentMethodEnum,
    objects: z.array(orderedObjectInfo),
    shippingFee: z.int32().nonnegative(),
    totalProductPrice: z.int32().nonnegative(),
    totalPayment: z.int32().nonnegative(),
});

export type OrderResponse = z.infer<typeof orderResponse>;
