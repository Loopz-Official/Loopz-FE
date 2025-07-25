import { useLikeToggleMutation } from '@/hooks/mutations/useObjectMutation';
import { ObjectCommonInfo } from '@/schemas/object/object';

import ProductItem from './ProductItem';

type ProductListProps = {
    products: ObjectCommonInfo[];
    fetchSize: number;
    isLikePage?: boolean;
};

export default function ProductList({
    products,
    fetchSize,
    isLikePage = false,
}: ProductListProps) {
    const { mutate } = useLikeToggleMutation();

    return products.length > 0 ? (
        <div className="grid w-full grid-cols-2 min-[481px]:grid-cols-3">
            {products.map((product, idx) => (
                <ProductItem
                    key={product.objectId}
                    product={product}
                    onLike={() =>
                        mutate({
                            objectId: product.objectId,
                            currentLiked: product.liked,
                        })
                    }
                    priority={idx < fetchSize}
                />
            ))}
        </div>
    ) : (
        <div className="text-body-01 pb-30 pt-20 text-center font-normal">
            {isLikePage ? '좋아요한' : '등록된'} 상품이 없습니다.
        </div>
    );
}
