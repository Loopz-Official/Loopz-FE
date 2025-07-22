'use client';

import { useParams } from 'next/navigation';

import ProductCard from '@/components/common/ProductCard/Order';
import { useOrderDetailQuery } from '@/hooks/queries/useOrderQuery';
import { CheckCircleComplete } from '@/icons/Common';
import { formatPrice } from '@/utils/formatPrice';

export default function CSRequestCompletePage() {
    const { claimNumber } = useParams<{ claimNumber: string }>();
    const {
        data: orderDetail,
        isLoading,
        error,
    } = useOrderDetailQuery(claimNumber);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;
    if (!orderDetail) return <div>No data...</div>;

    const { objects: orderedObjects } = orderDetail;

    return (
        <>
            <section className="flex flex-col items-center justify-center gap-8">
                <CheckCircleComplete />

                <div className="flex flex-col items-center gap-1.5">
                    <h3 className="text-body-01 font-semibold">
                        취소/반품 요청이 완료되었어요!
                    </h3>
                    <p className="text-gray-regular text-caption-01 text-center">
                        빠르게 요청을 확인하여
                        <br /> 환불 처리를 도와드리겠습니다.
                    </p>
                </div>
            </section>
            <section className="w-full border-t-[1.5px] pt-5">
                <h3 className="text-body-01 mb-4 font-semibold">
                    취소/반품 요청 상품
                </h3>
                <div className="flex flex-col gap-4">
                    {orderedObjects.map((object) => (
                        <ProductCard.Root
                            key={object.objectId}
                            className="justify-between"
                        >
                            <div className="flex w-fit flex-col gap-0.5 pt-1">
                                <span className="text-body-03">
                                    {object.objectName}
                                </span>
                                <span className="text-gray-03 text-caption-01">
                                    {formatPrice(object.purchasePrice)}원 / 수량{' '}
                                    {object.quantity}개
                                </span>
                            </div>
                            <ProductCard.Image
                                imageUrl={object.imageUrl}
                                alt={object.objectName}
                            />
                        </ProductCard.Root>
                    ))}
                </div>
            </section>
        </>
    );
}
