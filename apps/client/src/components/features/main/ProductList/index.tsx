import { useLikeToggleMutation } from '@/hooks/mutations/useObjectMutation';
import { ObjectCommonInfo } from '@/schemas/object/object';

import ProductItem from './ProductItem';

type ProductListProps = {
    products: ObjectCommonInfo[];
};

export default function ProductList({ products }: ProductListProps) {
    const { mutate } = useLikeToggleMutation();

    return products.length > 0 ? (
        <div className="grid w-full grid-cols-2 min-[481px]:grid-cols-3">
            {products.map((product) => (
                <ProductItem
                    key={product.objectId}
                    product={product}
                    onLike={() =>
                        mutate({
                            objectId: product.objectId,
                            currentLiked: product.liked,
                        })
                    }
                />
            ))}
        </div>
    ) : (
        <div className="text-body-01 pb-30 pt-20 text-center font-normal">
            등록된 상품이 없습니다.
        </div>
    );
}
