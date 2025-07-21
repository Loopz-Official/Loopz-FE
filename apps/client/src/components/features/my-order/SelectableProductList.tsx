'use client';

import ProductCard from '@/components/common/ProductCard/Order';
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
                <ProductCard.Root key={product.objectId}>
                    {isMultipleItems && (
                        <ProductCard.Checkbox
                            checked={isChecked(product.objectId)}
                            onChange={() => onToggle(product.objectId)}
                        />
                    )}
                    <ProductCard.Image
                        imageUrl={product.imageUrl}
                        alt={product.objectName}
                    />
                    <ProductCard.Info
                        name={product.objectName}
                        intro={product.intro}
                        price={product.purchasePrice}
                    />
                </ProductCard.Root>
            ))}
        </div>
    );
};

export default SelectableProductList;
