import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
    FilterRecord,
    objectBoardFilterRequest,
    paginationOptions,
} from '@/schemas/object';
import { validate } from '@/schemas/utils/validate';
import {
    getLikedObjectList,
    getObjectBoardList,
    getObjectDetail,
} from '@/services/api/object';

// Object Board 리스트를 위한 무한 스크롤 React Query 훅
export const useObjectBoardQuery = (
    filterParams: Partial<FilterRecord>,
    size: number
) => {
    return useInfiniteQuery({
        queryKey: ['object-board', filterParams, size],
        queryFn: async (context) => {
            const page =
                typeof context.pageParam === 'number'
                    ? context.pageParam + 1 // DB에서 page는 1부터 시작하므로 +1
                    : 1;

            // API 요청 파라미터 구성
            const params = validate(
                objectBoardFilterRequest,
                {
                    page,
                    size,
                    ...filterParams,
                },
                'Object Board Request'
            );

            return await getObjectBoardList(params);
        },
        initialPageParam: 0, // 현재까지 받은 페이지 수
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasNext) {
                return allPages.length; // 다음 pageParam = 현재까지 받은 페이지 수
            }
            return undefined;
        },
        staleTime: 1000 * 30, // 30초
        gcTime: 1000 * 60, // 1분
    });
};

// 오브제 상세 조회
export const useObjectDetailQuery = (objectId: string) => {
    return useQuery({
        queryKey: ['object', objectId],
        queryFn: () => getObjectDetail(objectId),
        enabled: !!objectId,
        staleTime: 1000 * 10, // 10초 (For testing)
        gcTime: 1000 * 30, // 30초 (For testing)
    });
};

// 오브제 좋아요 조회
export const useLikedObjectListQuery = (size: number) => {
    return useInfiniteQuery({
        queryKey: ['object-liked', size],
        queryFn: async (context) => {
            const page =
                typeof context.pageParam === 'number'
                    ? context.pageParam + 1 // DB에서 page는 1부터 시작하므로 +1
                    : 1;

            // API 요청 파라미터 구성
            const params = validate(
                paginationOptions,
                {
                    page,
                    size,
                },
                'Object Board Request'
            );

            return await getLikedObjectList(params);
        },
        initialPageParam: 0, // 현재까지 받은 페이지 수
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasNext) {
                return allPages.length; // 다음 pageParam = 현재까지 받은 페이지 수
            }
            return undefined;
        },
        staleTime: 1000 * 10, // 10초 (For testing)
        gcTime: 1000 * 30, // 30초 (For testing)
    });
};
