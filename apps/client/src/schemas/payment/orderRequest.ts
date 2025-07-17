import { z } from 'zod/v4';

import { prefixedUuidSchema } from '../utils/prefixedUuidSchema';

import { currencyEnum, portOnePaymentMethod } from './enum';

const storeIdSchema = prefixedUuidSchema('storeId', 'store-');
const channelKeySchema = prefixedUuidSchema('channelKey', 'channel-key-');

export const paymentRequest = z.object({
    storeId: storeIdSchema,
    channelKey: channelKeySchema,
    paymentId: z
        .string()
        .regex(/^[0-9a-f]{16}$/, '16자리 16진수 문자열이어야 합니다.'),
    orderName: z.string(),
    totalAmount: z.number(),
    currency: currencyEnum,
    payMethod: portOnePaymentMethod,
    // ...paymentOptions.shape, // PortOne 모듈 내 PaymentRequest와 동일하게 스키마 구현 필요
});
export type PaymentRequest = z.infer<typeof paymentRequest>;
