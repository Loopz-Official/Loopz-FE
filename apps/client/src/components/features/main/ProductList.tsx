import Link from 'next/link';

import { Object as Product } from '@/services/apis/object/type';

export default async function ProductList({
    products,
}: {
    products: Product[];
}) {
    return products.length > 0 ? (
        <div className="grid w-full grid-cols-2 pb-3 min-[481px]:grid-cols-3">
            {products.map((product) => (
                <Link
                    href={`/products/${product.objectId}`}
                    key={product.objectId}
                    className="hover:bg-gray-12 active:bg-gray-12 flex w-full flex-col gap-4 pb-6 transition-colors"
                >
                    <div className="aspect-square h-auto w-full bg-black">
                        {/* Note: product.imageUrl should be used here */}
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
