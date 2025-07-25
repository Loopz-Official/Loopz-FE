import { OrderItemVariant } from '@/constants/order';
import { ObjectInfo } from '@/schemas/object';
import { OrderedObjectDetailInfo } from '@/schemas/order';

import OrderItem from './OrderItem';

// Discriminated Union 타입 정의
// variant에 따라 올바른 prop만 받도록 강제

type OrderItemsSectionProps = {
    variant: OrderItemVariant;
    items: ObjectInfo[] | OrderedObjectDetailInfo[];
};

export default function OrderItemsSection({
    variant,
    items,
}: OrderItemsSectionProps) {
    return (
        <>
            <header>
                <h2 className="text-body-01 font-semibold">주문 상품</h2>
            </header>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.objectId}
                        className="not-last:border-b not-last:border-gray-regular not-last:pb-3"
                    >
                        <OrderItem item={item} variant={variant} />
                    </div>
                ))}
            </div>
        </>
    );
}
