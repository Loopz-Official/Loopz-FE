import { notFound } from 'next/navigation';

import OrderFormContent from './OrderFormPageContent';

export default async function Page({
    params,
}: {
    params: Promise<{ type: 'cart' | 'detail' }>;
}) {
    const type = (await params).type;
    if (type !== 'cart' && type !== 'detail') notFound();

    return <OrderFormContent type={type} />;
}
