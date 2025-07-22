import * as z from 'zod/v4';

import { serverAuthResponse } from './oauth';

export const nicknameRedundancyResponse = z.object({
    usable: z.boolean(),
});
export type NicknameRedundancyResponse = z.infer<
    typeof nicknameRedundancyResponse
>;

export const nicknameUpdateResponse = z.object({
    userId: z.uuid(),
    email: z.email(),
    loginName: z.string(),
    realName: z.string().nullable(),
    nickName: z.string(),
    enabled: z.boolean(),
    gender: z.string().nullable(),
    birthDate: z.string().nullable(),
});
export type NicknameUpdateResponse = z.infer<typeof nicknameUpdateResponse>;

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
