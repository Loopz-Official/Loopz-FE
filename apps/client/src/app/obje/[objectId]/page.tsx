import Image from 'next/image';

import ObjectMetadataUnit from '@/components/features/obje/ObjectMetadataUnit';
import PurchaseNotice from '@/components/features/obje/PurchaseNotice';

export default function ObjectDetailPage() {
    return (
        <>
            <Image
                src={'/obje-thumbnail.jpg'}
                alt="obje-thumbnail"
                width={672}
                height={672}
                sizes="(max-width: 672px) 100vw"
            />

            <section className="px-5 py-7">
                <div className="flex flex-col gap-1">
                    <span className="text-body-03">Britz 스피커</span>
                    <span className="text-headline-03 font-semibold">
                        47,200원
                    </span>
                </div>

                <div className="bg-gray-12 rounded-xs text-caption-01 mb-8 mt-5 px-3 py-4">
                    무선 블루투스 휴대용 스피커
                </div>

                <div className="flex flex-col gap-3">
                    <ObjectMetadataUnit
                        label="size"
                        metadata="166*125*107 mm"
                    />
                    <ObjectMetadataUnit
                        label="deliveryFee"
                        metadata="3,000원"
                    />
                    <ObjectMetadataUnit
                        label="deliveryInfo"
                        metadata="주문 후 2-3일 내 출고 예정"
                    />
                    <ObjectMetadataUnit label="stock" metadata="1개" />
                </div>
            </section>

            <div className="border-gray-light h-0 w-full border border-solid"></div>

            {/* 상품 상세 통 이미지 */}

            <div className="border-gray-light h-0 w-full border border-solid"></div>

            <PurchaseNotice />
        </>
    );
}
