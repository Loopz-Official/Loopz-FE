import { useInfiniteQuery } from '@tanstack/react-query';

import { ObjectBoardFilterRequest } from '@/schemas/object/object';
import { getObjectBoardList } from '@/services/api/object';

// Object Board 리스트를 위한 무한 스크롤 React Query 훅
export const useObjectBoardQuery = (filterParams: Record<string, string>) => {
    return useInfiniteQuery({
        queryKey: ['object-board', filterParams],
        queryFn: async (context) => {
            const page =
                typeof context.pageParam === 'number'
                    ? context.pageParam + 1 // DB에서 page는 1부터 시작하므로 +1
                    : 0;

            // API 요청 파라미터 구성
            const params: ObjectBoardFilterRequest = {
                page,
                size: 10,
                ...filterParams,
            };

            return await getObjectBoardList(params);
        },
        initialPageParam: 0, // 현재까지 받은 페이지 수
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasNext) {
                return allPages.length; // 다음 pageParam = 현재까지 받은 페이지 수
            }
            return undefined;
        },
    });
};
