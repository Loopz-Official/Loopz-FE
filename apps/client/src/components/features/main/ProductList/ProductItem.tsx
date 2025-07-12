import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback } from 'react';

import LikeIconDynamic from '@/components/icons/LikeIcon';
import { ObjectCommonInfo } from '@/schemas/object/object';
import { formatPrice } from '@/utils/formatPrice';

type ProductItemProps = {
    product: ObjectCommonInfo;
};

const ProductItem = memo(function ProductItem({ product }: ProductItemProps) {
    const isSoldOut = product.stock === 0;
    const likeIconStyling = product.liked
        ? { fill: '#FFF', stroke: '#FFF' }
        : { fill: '#00000008', stroke: '#FFF' };

    const handleLike = () => {
        // TODO: 실제 좋아요 API 호출 로직을 여기에 작성
        // 예: likeProduct(product.objectId)
        alert('like!');
    };

    const handleLikeButtonClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            handleLike();
        },
        []
    );

    const handleLikeButtonKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            // For button tag default action
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLike();
            }
        },
        []
    );

    return (
        <Link
            href={`/obje/${product.objectId}`}
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
                    <div
                        onClick={handleLikeButtonClick}
                        onKeyDown={handleLikeButtonKeyDown}
                        className="absolute bottom-2 right-2 z-10 cursor-pointer"
                        role="button"
                        tabIndex={0}
                    >
                        <LikeIconDynamic
                            fill={likeIconStyling.fill}
                            stroke={likeIconStyling.stroke}
                        />
                    </div>
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
});

export default ProductItem;
