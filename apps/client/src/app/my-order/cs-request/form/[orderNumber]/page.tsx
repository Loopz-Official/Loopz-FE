'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import HorizontalDivider from '@/components/common/Divider/Horizontal';
import SelectableProductList from '@/components/features/my-order/SelectableProductList';
import { useOrderDetailQuery } from '@/hooks/queries/useOrderQuery';

export default function CsRequestFormPage() {
    const params = useParams<{ orderNumber: string }>();
    const { orderNumber } = params;

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    console.log(selectedIds);

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
            <section className="flex flex-col gap-4">
                <h3 className="text-body-01 font-semibold">취소/반품 상품</h3>
                <SelectableProductList
                    products={orderedObjects.objects}
                    onSelectionChange={setSelectedIds}
                />
                <HorizontalDivider marginTop="2" />
            </section>
        </>
    );
}
