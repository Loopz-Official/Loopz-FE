'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import BottomFixedButton from '@/components/common/Button/BottomFixed';
import HorizontalDivider from '@/components/common/Divider/Horizontal';
import ClaimReasonSelector from '@/components/features/my-order/Claim/ReasonSelector';
import SelectableProductList from '@/components/features/my-order/SelectableProductList';
import { useCheckGroup } from '@/hooks/check/useCheckGroup';
import { useOrderDetailQuery } from '@/hooks/queries/useOrderQuery';
import { useSingleSelect } from '@/hooks/select/useSingleSelect';

export default function CsRequestFormPage() {
    const router = useRouter();
    const { orderNumber } = useParams<{ orderNumber: string }>();

    const {
        data: orderDetail,
        isLoading,
        error,
    } = useOrderDetailQuery(orderNumber);

    const { selectedValue, onChange } = useSingleSelect();
    const productIds = useMemo(
        () => (orderDetail?.objects || []).map((p) => p.objectId),
        [orderDetail]
    );
    const isMultipleItems = productIds.length > 1;

    const {
        checked: selectedIds,
        isChecked,
        toggle,
    } = useCheckGroup<string | number>(productIds, !isMultipleItems);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    if (!orderDetail) return <div>No data...</div>;

    const { objects: orderedObjects } = orderDetail;

    const handleSumbit = () => {
        // TODO: API 연동
        console.log({
            orderNumber,
            reason: selectedValue,
            productIds: selectedIds,
        });
        router.push(`/my-order/cs-request/complete/${orderNumber}`); // 임시로 orderNumber로 대체 (추후 claimNumber로 변경)
    };

    return (
        <>
            <section className="mb-6 flex flex-col gap-4">
                <h3 className="text-body-01 font-semibold">취소/반품 상품</h3>
                <SelectableProductList
                    products={orderedObjects}
                    isMultipleItems={isMultipleItems}
                    isChecked={isChecked}
                    onToggle={toggle}
                />
                <HorizontalDivider margin="mt-2" />
            </section>

            <ClaimReasonSelector
                claimType="cancel"
                selectedValue={selectedValue}
                onChange={onChange}
            />

            <BottomFixedButton
                text="취소/반품 신청"
                isDisabled={selectedIds.length === 0 || !selectedValue}
                onClick={handleSumbit}
            />
        </>
    );
}
