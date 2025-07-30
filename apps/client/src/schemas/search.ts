import { z } from 'zod/v4';

// 관련 검색어(제품명) 조회
export const relativeObjectResponse = z.array(
    z.object({
        objectId: z.uuid(),
        objectName: z.string(),
    })
);
export type RelativeObjectResponse = z.infer<typeof relativeObjectResponse>;

// 최근 검색어 조회
export const searchHistoryResponse = z.array(
    z.object({
        searchId: z.uuid(),
        keyword: z.string(),
    })
);
export type SearchHistoryResponse = z.infer<typeof searchHistoryResponse>;
