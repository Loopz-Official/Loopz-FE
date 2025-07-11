import { useQuery } from '@tanstack/react-query';

import { getMyAccountInfo } from '@/services/api/user';

export const useUserInfoQuery = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMyAccountInfo,
        staleTime: 1000 * 10, // 10초 (For testing)
        gcTime: 1000 * 30, // 30초 (For testing)
    });
};
