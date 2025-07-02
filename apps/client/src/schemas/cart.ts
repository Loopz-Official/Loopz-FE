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
