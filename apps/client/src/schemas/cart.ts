import * as z from 'zod/v4';

import { objectInfos } from './object';

export const cartInquiryResponse = z.object({
    availableItems: z.array(
        z.object({
            object: objectInfos,
            quantity: z.int32().nonnegative(),
        })
    ),

    outOfStock: z.array(z.optional(z.string())),
});

export type CartInquiryResponse = z.infer<typeof cartInquiryResponse>;

export const cartItemUpdateResponse = z.object({
    quantity: z.int32().nonnegative(),
});
