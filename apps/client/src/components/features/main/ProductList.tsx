import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import LikeIconDynamic from '@/components/icons/LikeIcon';
import { ObjectCommonInfo } from '@/schemas/object/object';
import { formatPrice } from '@/utils/formatPrice';

type ProductListProps = {
    products: ObjectCommonInfo[];
};

export default function ProductList({ products }: ProductListProps) {
    const handleLikeButtonClick = (e: React.MouseEvent) => {
        e.preventDefault(); // 내비게이션 방지
        alert('like!');
    };

    return products.length > 0 ? (
        <div className="grid w-full grid-cols-2 min-[481px]:grid-cols-3">
            {products.map((product) => {
                const isSoldOut = product.stock === 0;
                const likeIconStyling = product.liked
                    ? { fill: '#FFF', stroke: '#FFF' }
                    : { fill: '#00000008', stroke: '#FFF' };

                return (
                    <Link
                        href={`/obje/${product.objectId}`}
                        key={product.objectId}
                        className="flex w-full flex-col gap-4 pb-6 transition-colors"
                    >
                        <div
                            className={clsx(
                                'bg-gray-regular relative aspect-square h-auto w-full',
                                {
                                    "before:absolute before:z-10 before:h-full before:w-full before:bg-black/40 before:content-['']":
                                        isSoldOut,
                                }
                            )}
                        >
                            {isSoldOut ? (
                                <div className="text-headline-04 -translate-1/2 absolute left-1/2 top-1/2 z-10 font-medium text-white">
                                    SOLD OUT
                                </div>
                            ) : (
                                <button
                                    onClick={handleLikeButtonClick}
                                    className="absolute bottom-2 right-2 z-10"
                                >
                                    <LikeIconDynamic
                                        fill={likeIconStyling.fill}
                                        stroke={likeIconStyling.stroke}
                                    />
                                </button>
                            )}
                            <Image
                                src={product.imageUrl}
                                alt="상품 이미지"
                                fill
                                sizes="(max-width: 672px) 100vw"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="px-3">
                            <h3 className="text-caption-01 truncate font-semibold">
                                {product.objectName}
                            </h3>
                            <p className="text-caption-01 text-gray-regular line-clamp-2 h-9 whitespace-pre-line break-keep">
                                {product.intro}
                            </p>
                            <p className="text-body-03 mt-2 font-semibold tracking-normal">
                                {formatPrice(product.objectPrice)}원
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    ) : (
        <div className="text-body-01 pb-30 pt-20 text-center font-normal">
            등록된 상품이 없습니다.
        </div>
    );
}
