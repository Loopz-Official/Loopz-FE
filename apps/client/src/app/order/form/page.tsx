'use client';

import { notFound, useSearchParams } from 'next/navigation';

import { OrderFrom } from '@/constants/order';

import OrderFormContent from './OrderFormPageContent';

export default function Page() {
    const searchParams = useSearchParams();
    const orderFrom = searchParams.get('orderFrom') as OrderFrom;
    if (orderFrom !== 'cart' && orderFrom !== 'detail') notFound();

    return <OrderFormContent orderFrom={orderFrom} />;
}
