import { z } from 'zod/v4';

import { prefixedUuidSchema } from '../utils/prefixedUuidSchema';

import { currencyEnum, nicePaymentsPayMethod } from './enum';
import { callbackUrls, windowType } from './options';

// 결제 요청 시 고객사 및 PG사 ID 검증 schema
const storeIdSchema = prefixedUuidSchema('storeId', 'store-');
const channelKeySchema = prefixedUuidSchema('channelKey', 'channel-key-');

// 결제 요청 시 전달할 Custom Data 스키마
export const purchasedItem = z.object({
    productId: z.uuid(),
    productName: z.string(),
    quantity: z.int32().positive(),
    price: z.int32().nonnegative(),
    currency: currencyEnum,
});

export const customDataSchema = z.object({
    userId: z.string(),
    orderId: z.string(),
    purchasedItems: z.array(purchasedItem),
});
export type CustomDataSchema = z.infer<typeof customDataSchema>;

// 결제 요청 스키마
export const paymentRequest = z.object({
    storeId: storeIdSchema,
    channelKey: channelKeySchema,
    paymentId: z
        .string()
        .regex(/^[0-9a-f]{16}$/, '16자리 16진수 문자열이어야 합니다.'),
    orderName: z.string(),
    totalAmount: z.int32().nonnegative(),
    currency: currencyEnum,
    payMethod: nicePaymentsPayMethod,
    customData: customDataSchema,
    windowType,
    ...callbackUrls.shape,
    // ...paymentOptions.shape, // Option 필드는 필요할 때 추가 (사용하는 키 값들만 runtime validation 처리)
});
export type PaymentRequest = z.infer<typeof paymentRequest>;
