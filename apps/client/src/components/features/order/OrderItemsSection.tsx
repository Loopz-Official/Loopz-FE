import { OrderItemVariant } from '@/constants/order';
import { ObjectInfo } from '@/schemas/object';
import { OrderedObjectInfo } from '@/schemas/order';

import OrderItem from './OrderItem';

type OrderItemsSectionProps = {
    productInfos?: ObjectInfo[];
    orderItems?: OrderedObjectInfo[];
    variant: OrderItemVariant;
};

export default function OrderItemsSection({
    productInfos,
    orderItems,
    variant,
}: OrderItemsSectionProps) {
    const items: ObjectInfo[] | OrderedObjectInfo[] =
        variant === 'form' ? (productInfos ?? []) : (orderItems ?? []);

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
