'use client';

import { usePathname } from 'next/navigation';

import { useObjectDetailQuery } from '@/hooks/queries/useObjectDetailQuery';
import { usePurchaseCountStore } from '@/hooks/stores/usePurchaseCount';
import { formatPrice } from '@/utils/formatPrice';
import VerticalDivider from '@/components/common/VerticalDivider';

import OrderQuantity from './OrderQuantity';

const BottomSheet = () => {
    const pathname = usePathname();
    const objectId = pathname.split('/')[2];

    // objectId가 없는 경우 아무것도 렌더링하지 않음
    if (!objectId) return null;

    return <BottomSheetContent objectId={objectId} />;
};

const BottomSheetContent = ({ objectId }: { objectId: string }) => {
    const { objectDetail } = useObjectDetailQuery(objectId);
    const { count } = usePurchaseCountStore();

    return (
        <div className="bottom-17 border-gray-regular absolute z-50 h-fit w-full rounded-t-2xl border-b border-solid bg-white px-5 pb-7">
            <section className="mb-3 flex h-7 w-full items-center justify-center">
                <div className="bg-gray-11 h-1 w-10 rounded-full" />
            </section>

            <section className="flex w-full flex-col gap-4">
                <section className="flex w-fit flex-col gap-1">
                    <span className="text-body-02 font-semibold">
                        {objectDetail?.objectResponse?.objectName}
                    </span>
                    <span className="text-caption-01 font-semibold">
                        {formatPrice(objectDetail?.objectResponse?.objectPrice)}
                        원
                    </span>
                </section>

                <div className="border-gray-regular h-[0px] w-full border-[0.5px] border-solid" />

                <section className="flex items-center justify-between">
                    <div className="text-caption-01 flex items-center gap-2">
                        <span className="font-semibold">구매 수량</span>
                        <VerticalDivider />
                        <span className="text-point font-medium">
                            {objectDetail?.stock}개 남음
                        </span>
                    </div>

                    <OrderQuantity stock={objectDetail?.stock ?? 0} />
                </section>

                <div className="border-gray-regular h-[0px] w-full border-[0.5px] border-solid" />

                <section className="flex w-full items-center justify-between">
                    <span className="text-caption-01 font-semibold">
                        총 상품 금액 ({count}개)
                    </span>
                    <span className="text-body-01 font-semibold">
                        {(
                            (objectDetail?.objectResponse?.objectPrice ?? 0) *
                            count
                        ).toLocaleString()}
                        원
                    </span>
                </section>
            </section>
        </div>
    );
};

export default BottomSheet;
