'use client';

import { useParams } from 'next/navigation';

import HorizontalDivider from '@/components/common/Divider/Horizontal';
import OrderDetailPageHeader from '@/components/features/my-order/Header/OrderDetailPage';
import MyOrderItem from '@/components/features/my-order/MyOrderItem';
import { useOrderDetailQuery } from '@/hooks/queries/useOrderQuery';

export default function MyOrderDetailPage() {
    const params = useParams<{ orderNumber: string }>();
    const { orderNumber } = params;

    const {
        data: orderedObjects,
        isLoading,
        error,
    } = useOrderDetailQuery(orderNumber);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!orderedObjects) return <div>No data</div>;

    return (
        <>
            <OrderDetailPageHeader orderNumber={orderedObjects.orderNumber} />
            <HorizontalDivider isViewportWidth height="3" />
            <div className="flex w-full flex-col gap-6 px-5 py-6">
                <MyOrderItem orderedObjects={orderedObjects.objects} />
                <HorizontalDivider lightColor />
            </div>
        </>
    );
}
