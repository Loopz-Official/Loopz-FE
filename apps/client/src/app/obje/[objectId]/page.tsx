'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ObjectMetadataUnit from '@/components/features/obje/ObjectMetadataUnit';
import PurchaseNotice from '@/components/features/obje/PurchaseNotice';
import { ObjectDetailInfo } from '@/schemas/objectDetail';
import { getObjectDetail } from '@/services/api/object';
import { formatPrice } from '@/utils/formatPrice';

export default function ObjectDetailPage() {
    const pathname = usePathname();

    const [objectDetail, setObjectDetail] = useState<ObjectDetailInfo>();

    useEffect(() => {
        const objectId = pathname.split('/')[2];

        const fetchObjectDetail = async () => {
            if (!objectId) return;

            const detailInfo = await getObjectDetail(objectId);
            setObjectDetail(detailInfo);
        };

        fetchObjectDetail();
    }, [pathname]);

    return (
        <>
            <Image
                src={
                    objectDetail?.objectResponse?.imageUrl ??
                    '/obje-thumbnail.jpg'
                }
                alt="obje-thumbnail"
                width={672}
                height={672}
                priority
                sizes="(max-width: 672px) 100vw"
            />

            <section className="px-5 py-7">
                <div className="flex flex-col gap-1">
                    <span className="text-body-03">
                        {objectDetail?.objectResponse?.objectName}
                    </span>
                    <span className="text-headline-03 font-semibold">
                        {formatPrice(objectDetail?.objectResponse?.objectPrice)}
                        원
                    </span>
                </div>

                <div className="bg-gray-12 rounded-xs text-caption-01 mb-8 mt-5 px-3 py-4">
                    {objectDetail?.objectResponse?.intro}
                </div>

                <div className="flex flex-col gap-3">
                    <ObjectMetadataUnit
                        label="size"
                        metadata={objectDetail?.size ?? ''}
                    />
                    <ObjectMetadataUnit
                        label="deliveryFee"
                        metadata="3,000원"
                    />
                    <ObjectMetadataUnit
                        label="deliveryInfo"
                        metadata="주문 후 2-3일 내 출고 예정"
                    />
                    <ObjectMetadataUnit
                        label="stock"
                        metadata={`${objectDetail?.stock ?? 0}개`}
                    />
                </div>
            </section>

            <div className="border-gray-light h-0 w-full border border-solid"></div>

            {/* 상품 상세 통 이미지 */}
            <section className="px-5 pb-7 pt-6">
                <Image
                    width={672}
                    height={672}
                    sizes="(max-width: 672px) 100vw"
                    src={objectDetail?.descriptionUrl ?? '/obje-detail.jpg'}
                    alt="obje-detail-image"
                />
            </section>

            <div className="border-gray-light h-0 w-full border border-solid"></div>

            <PurchaseNotice />
        </>
    );
}
