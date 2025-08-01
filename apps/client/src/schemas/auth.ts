import * as z from 'zod/v4';

import { serverAuthResponse } from './oauth';

export const nicknameRedundancyResponse = z.object({
    usable: z.boolean(),
});
export type NicknameRedundancyResponse = z.infer<
    typeof nicknameRedundancyResponse
>;

// 닉네임 변경 시 회원 정보 schema
export const nicknameUpdateResponse = z.object({
    userId: z.uuid(),
    email: z.email(),
    loginName: z.string(),
    realName: z.nullable(z.string()),
    nickName: z.string(),
    enabled: z.boolean(),
    gender: z.nullable(z.enum(['MALE', 'FEMALE', 'UNKNOWN'])),
    birthDate: z.nullable(z.string()),
});
export type NicknameUpdateResponse = z.infer<typeof nicknameUpdateResponse>;

// 약관 동의 시 회원 정보 schema
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

// 회원가입 시 이메일 정보 schema
export const userEmailInfo = z.email();
export type UserEmailInfo = z.infer<typeof userEmailInfo>;

export const logoutResponse = z.object({
    message: z.string(),
});
