import { useQuery } from '@tanstack/react-query';

import { getCartInquiry } from '@/services/api/cart';

export const useCartInquiryQuery = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCartInquiry,
        staleTime: 1000 * 10, // 10초 (For testing)
        gcTime: 1000 * 30, // 30초 (For testing)
    });
};
