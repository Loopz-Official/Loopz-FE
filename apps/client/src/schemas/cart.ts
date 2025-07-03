import * as z from 'zod/v4';

import { objectInfos } from './object';

export const cartItemInfo = z.object({
    object: objectInfos,
    quantity: z.int32().nonnegative(),
});

export type CartItemInfo = z.infer<typeof cartItemInfo>;

export const cartInquiryResponse = z.object({
    availableItems: z.array(cartItemInfo),
    outOfStock: z.array(z.optional(z.string())),
});

export type CartInquiryResponse = z.infer<typeof cartInquiryResponse>;

export const cartItemUpdateResponse = z.object({
    quantity: z.int32().nonnegative(),
});

export type CartItemUpdateResponse = z.infer<typeof cartItemUpdateResponse>;

// 장바구니 내 선택된 상품의 아이디 배열 타입
export const objectIdArraySchema = z.array(z.uuid());
export type ObjectIdArray = z.infer<typeof objectIdArraySchema>;
