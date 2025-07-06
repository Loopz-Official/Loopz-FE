import * as z from 'zod/v4';

// 상세보기에서 주문
export const detailOrderRequest = z.object({
    quantity: z.number(),
    addressId: z.string(),
    paymentMethod: z.string(),
    deliveryRequest: z.string(),
    agreedToTerms: z.boolean(),
});

export type DetailOrderRequest = z.infer<typeof detailOrderRequest>;

// 장바구니에서 주문
export const cartOrderRequest = z.object({
    addressId: z.string(),
    paymentMethod: z.string(),
    deliveryRequest: z.string(),
    objectIds: z.array(z.string()),
    agreedToTerms: z.boolean(),
});

export type CartOrderRequest = z.infer<typeof cartOrderRequest>;
