import * as z from 'zod/v4';

import { objectInfos } from './object';

const selectedObjectInfo = objectInfos.pick({
    objectId: true,
    objectName: true,
    objectPrice: true,
    imageUrl: true,
});

export const selectedProduct = z.object({
    ...selectedObjectInfo.shape,
    quantity: z.int32().nonnegative(),
});

export type SelectedProduct = z.infer<typeof selectedProduct>;

export const paymentMethod = z.enum(['BANK_TRANSFER', 'CREDIT_CARD']);
export type PaymentMethod = z.infer<typeof paymentMethod>;

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
