import { useQuery } from '@tanstack/react-query';

import { getObjectDetail } from '@/services/api/object';

export const useObjectDetailQuery = (objectId: string) => {
    const {
        data: objectDetail,
        status,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['object', objectId],
        queryFn: () => getObjectDetail(objectId),
        enabled: !!objectId,
        staleTime: 1000 * 10, // 10초 (For testing)
        gcTime: 1000 * 30, // 30초 (For testing)
    });

    return { objectDetail, status, isLoading, error };
};
