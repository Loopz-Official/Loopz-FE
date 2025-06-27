import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { ObjectInfo } from '@/schemas/object';

type ProductListProps = {
    products: ObjectInfo[];
};

export default function ProductList({ products }: ProductListProps) {
    return products.length > 0 ? (
        <div className="grid w-full grid-cols-2 pb-3 min-[481px]:grid-cols-3">
            {products.map((product) => (
                <Link
                    href={`/obje/${product.objectId}`}
                    key={product.objectId}
                    className="hover:bg-gray-12 active:bg-gray-12 flex w-full flex-col gap-4 pb-6 transition-colors"
                >
                    <div
                        className={clsx(
                            'relative aspect-square h-auto w-full bg-black',
                            {
                                "before:absolute before:z-10 before:h-full before:w-full before:bg-black/40 before:content-['']":
                                    product.soldOut,
                            }
                        )}
                    >
                        {product.soldOut && (
                            <div className="text-headline-04 -translate-1/2 absolute left-1/2 top-1/2 z-10 font-medium text-white">
                                SOLD OUT
                            </div>
                        )}
                        <Image
                            src={product.imageUrl}
                            alt="상품 이미지"
                            fill
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="px-3">
                        <h3 className="text-caption-01 font-semibold">
                            {product.objectName}
                        </h3>
                        <p className="text-caption-01 text-gray-regular break-keep">
                            {product.intro}
                        </p>
                        <p className="text-body-03 mt-2 font-semibold tracking-normal">
                            {product.objectPrice.toLocaleString()}원
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    ) : (
        <div className="text-headline-04 pb-30 pt-20 text-center font-normal">
            등록된 상품이 없습니다.
        </div>
    );
}
