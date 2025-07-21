import * as z from 'zod/v4';

// Enum
export const genderEnum = z.enum(['MALE', 'FEMAIL', 'UNKNOWN']);
export type GenderType = z.infer<typeof genderEnum>;

export const baseAccountInfo = z.object({
    userId: z.uuid(),
    email: z.email(),
    loginName: z.string(),
    realName: z.nullable(z.string()),
    nickName: z.string(),
    enabled: z.boolean(),
});

export const myAccountInfo = z.object({
    ...baseAccountInfo.shape,
    imageUrl: z.nullable(z.url()),
    socialLoginType: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
});
export type MyAccountInfo = z.infer<typeof myAccountInfo>;

export const deatilAccountInfo = z.object({
    ...baseAccountInfo.shape,
    birthDate: z.string().optional(),
    gender: genderEnum.optional(),
});
export type DetailAccountInfo = z.infer<typeof deatilAccountInfo>;
