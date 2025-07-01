import { useQuery } from '@tanstack/react-query';

import { getAddressList } from '@/services/api/address';

export function useAddressListQuery() {
    return useQuery({
        queryKey: ['addresses'],
        queryFn: getAddressList,
        staleTime: 1000 * 30, // 30초
        gcTime: 1000 * 60, // 1분
    });
}
