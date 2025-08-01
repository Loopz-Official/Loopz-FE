'use client';

import CheckBox from '@/components/common/CheckBox';
import ProductCard from '@/components/common/ProductCard';
import { OrderedObjectDetailInfo } from '@/schemas/order';

interface SelectableProductListProps {
    products: OrderedObjectDetailInfo[];
    isMultipleItems: boolean;
    isChecked: (id: string | number) => boolean;
    onToggle: (id: string | number) => void;
}

const SelectableProductList = ({
    products,
    isMultipleItems,
    isChecked,
    onToggle,
}: SelectableProductListProps) => {
    return (
        <div className="flex w-fit flex-col gap-4">
            {products.map((product) => (
                <ProductCard.Order.Root key={product.objectId}>
                    {isMultipleItems && (
                        <CheckBox
                            checked={isChecked(product.objectId)}
                            onChange={() => onToggle(product.objectId)}
                            variant="product-card"
                            size="md"
                        />
                    )}
                    <ProductCard.Order.Image
                        imageUrl={product.imageUrl}
                        alt={product.objectName}
                    />
                    <ProductCard.Order.Info
                        name={product.objectName}
                        intro={product.intro}
                        price={product.purchasePrice}
                    />
                </ProductCard.Order.Root>
            ))}
        </div>
    );
};

export default SelectableProductList;
