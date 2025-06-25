import * as z from 'zod/v4';

// Google Token Response DTO
export const googleTokenResponse = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    id_token: z.string(),
    scope: z.string(),
    token_type: z.string(),
});

export type GoogleTokenResponse = z.infer<typeof googleTokenResponse>;

// Server Auth Response DTO
export const serverAuthResponse = z.object({
    userId: z.uuid(),
    email: z.email(),
    loginName: z.nullable(z.string()),
    realName: z.nullable(z.string()),
    nickName: z.nullable(z.string()),
    enabled: z.boolean(),
});

export type ServerAuthResponse = z.infer<typeof serverAuthResponse>;
