import { useEffect, useMemo } from 'react';

import ProductCard from '@/components/common/ProductCard/Order';
import { useCheckGroup } from '@/hooks/check/useCheckGroup';
import { OrderedObjectDetailInfo } from '@/schemas/order';

interface SelectableProductListProps {
    products: OrderedObjectDetailInfo[];
    onSelectionChange: (selectedIds: string[]) => void;
}

const SelectableProductList = ({
    products,
    onSelectionChange,
}: SelectableProductListProps) => {
    // 상품이 여러 개일 때만 선택 기능을 사용 (하나일 때는 항상 선택된 것으로 간주)
    const isMultipleItems = products.length > 1;
    const productIds = useMemo(
        () => products.map((p) => p.objectId),
        [products]
    );

    // useCheckGroup 훅을 사용
    // 아이템이 여러 개일 경우 -> 체크박스 사용, 초기 상태는 '전체 해제' (defaultCheckedAll = false)
    // 아이템이 하나일 경우 -> 체크박스 없음, 초기 상태는 '전체 선택' (defaultCheckedAll = true)
    const {
        checked: selectedIds,
        isChecked,
        toggle,
    } = useCheckGroup(
        productIds,
        !isMultipleItems // true(하나) -> 전체 선택, false(여러개) -> 전체 해제
    );

    // 선택 상태가 변경될 때마다 부모 컴포넌트에 알려줌
    useEffect(() => {
        onSelectionChange(selectedIds);
    }, [selectedIds, onSelectionChange]);

    return (
        <div className="flex flex-col gap-4">
            {products.map((product) => (
                <ProductCard.Root key={product.objectId}>
                    {/* 아이템이 여러 개일 때만 체크박스 렌더링 */}
                    {isMultipleItems && (
                        <ProductCard.Checkbox
                            checked={isChecked(product.objectId)}
                            onChange={() => toggle(product.objectId)}
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
