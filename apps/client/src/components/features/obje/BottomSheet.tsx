'use client';

import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';
import VerticalDivider from '@/components/common/VerticalDivider';
import { usePurchaseCountStore } from '@/hooks/stores/usePurchaseCount';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { ObjectDetailInfo } from '@/schemas/object/object';
import { formatPrice } from '@/utils/formatPrice';

import OrderQuantity from './OrderQuantity';

type BottomSheetProps = {
    objectId: string;
    objectDetail: ObjectDetailInfo;
};

const BottomSheet = ({ objectId, objectDetail }: BottomSheetProps) => {
    const router = useRouter();

    const { count } = usePurchaseCountStore();
    const { setProducts } = useSelectedProductsStore();

    if (!objectId) return <div>오브제가 존재하지 않습니다.</div>;
    if (!objectDetail)
        return <div>오브제에 상세 정보가 존재하지 않습니다.</div>;

    const stock = objectDetail.stock;

    const handleBottomButtonClick = () => {
        const product = {
            objectId,
            objectName: objectDetail.objectName,
            objectPrice: objectDetail.objectPrice,
            imageUrl: objectDetail.imageUrl,
            quantity: count,
        };
        setProducts([product]);

        router.push('/order/form/?orderFrom=detail');
    };

    return (
        <div className="border-gray-regular pb-25 absolute bottom-0 z-50 h-fit w-full rounded-t-2xl border-b border-solid bg-white px-5">
            <section className="mb-3 flex h-7 w-full items-center justify-center">
                <div className="bg-gray-11 h-1 w-10 rounded-full" />
            </section>

            <section className="flex w-full flex-col gap-4">
                <section className="flex w-fit flex-col gap-1">
                    <span className="text-body-02 font-semibold">
                        {objectDetail?.objectName}
                    </span>
                    <span className="text-caption-01 font-semibold">
                        {formatPrice(objectDetail.objectPrice)}원
                    </span>
                </section>

                <div className="border-gray-regular h-[0px] w-full border-[0.5px] border-solid" />

                <section className="flex items-center justify-between">
                    <div className="text-caption-01 flex items-center gap-2">
                        <span className="font-semibold">구매 수량</span>
                        <VerticalDivider />
                        <span className="text-point font-medium">
                            {stock}개 남음
                        </span>
                    </div>

                    <OrderQuantity type="bottomSheet" stock={stock} />
                </section>

                <div className="border-gray-regular h-[0px] w-full border-[0.5px] border-solid" />

                <section className="flex w-full items-center justify-between">
                    <span className="text-caption-01 font-semibold">
                        총 상품 금액 ({count}개)
                    </span>
                    <span className="text-body-01 font-semibold">
                        {formatPrice(objectDetail.objectPrice * count)}원
                    </span>
                </section>
            </section>

            <BottomButton
                text="구매하기"
                isDisabled={stock === 0}
                onClick={handleBottomButtonClick}
                isBottomSheetOpen={true}
            />
        </div>
    );
};

export default BottomSheet;
