import * as z from 'zod/v4';

export const myAccountInfo = z.object({
    userId: z.uuid(),
    email: z.email(),
    realName: z.nullable(z.string()),
    loginName: z.string(),
    nickName: z.string(),
    imageUrl: z.nullable(z.url()),
    enabled: z.boolean(),
    socialLoginType: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
});
export type MyAccountInfo = z.infer<typeof myAccountInfo>;
