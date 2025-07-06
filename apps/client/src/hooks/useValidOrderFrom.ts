import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { OrderFrom } from '@/constants/order';

export function useValidOrderFrom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderFrom = searchParams.get('orderFrom');
    const isValid = orderFrom === 'cart' || orderFrom === 'detail';

    useEffect(() => {
        if (!isValid) {
            router.replace('/main');
        }
    }, [isValid, router]);

    if (isValid) {
        return { orderFrom: orderFrom as OrderFrom, isValid: true as const };
    }
    return { orderFrom: null, isValid: false as const };
}
