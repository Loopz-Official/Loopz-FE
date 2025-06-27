import * as z from 'zod/v4';

import { serverAuthResponse } from './oauth';

export const termsAgreement = z.object({
    over14: z.nullable(z.boolean()),
    agreedServiceTerms: z.nullable(z.boolean()),
    agreedMarketing: z.nullable(z.boolean()),
    agreedEventSMS: z.nullable(z.boolean()),
});

export type TermsAgreement = z.infer<typeof termsAgreement>;

export const userInfo = z.object({
    ...serverAuthResponse.shape,
    ...termsAgreement.shape,
});

export type UserInfo = z.infer<typeof userInfo>;

export const logoutResponse = z.object({
    message: z.string(),
});
