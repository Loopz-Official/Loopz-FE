import * as z from 'zod/v4';

// Terms Schema
export const term = z.object({
    id: z.string(),
    title: z.string(),
    href: z.string(),
    mandatory: z.boolean(),
});

export type Term = z.infer<typeof term>;

// 약관 목록 스키마
export const termList = z.array(term);
export type TermList = z.infer<typeof termList>;

// // 서버에서 받아올 약관 응답 스키마 (추후 API 연동 시 사용)
// export const termResponse = z.object({
//     terms: termList,
// });

// export type TermResponse = z.infer<typeof termResponse>;

// // 약관 동의 요청 스키마 (서버로 보낼 데이터)
// export const termConsentRequest = z.object({
//     termIds: z.array(z.string()),
// });

// export type TermConsentRequest = z.infer<typeof termConsentRequest>;

// // 약관 동의 응답 스키마
// export const termConsentResponse = z.object({
//     success: z.boolean(),
//     message: z.string().optional(),
// });

// export type TermConsentResponse = z.infer<typeof termConsentResponse>;
