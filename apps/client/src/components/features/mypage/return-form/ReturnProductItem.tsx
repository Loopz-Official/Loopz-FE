import Image from 'next/image';

import { formatPrice } from '@/utils/formatPrice';

export default function ReturnProductItem({
    type,
}: {
    type: 'cancel' | 'return';
}) {
    const isCancel = type === 'cancel';

    // 추후 props로 전달
    const product = {
        objectName: '이름이름이름',
        intro: '설명설명설명설명설명설명',
        objectPrice: 10000,
        imageUrl: '/banner/01.png',
    };

    return (
        <div>
            <div className="text-body-03 mb-2 flex items-center justify-between font-semibold">
                {isCancel ? '취소 상품' : '반품 상품'}
            </div>

            {/* 상품 정보 */}
            <div className="mb-1.5 grid grid-cols-[auto_1fr] gap-3">
                <div className="bg-gray-regular relative aspect-square h-auto w-[clamp(70px,20vw,100px)]">
                    <Image
                        src={product.imageUrl}
                        alt={product.objectName}
                        fill
                        className="h-auto w-auto object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="text-caption-01 mb-0.5 font-semibold">
                        {product.objectName}
                    </div>
                    <div className="text-caption-01 text-gray-regular mb-2 line-clamp-2">
                        {product.intro}
                    </div>
                    <div className="text-body-03 font-semibold">
                        {formatPrice(product.objectPrice)}원
                    </div>
                </div>
            </div>
        </div>
    );
}
