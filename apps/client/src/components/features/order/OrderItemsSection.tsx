import { OrderItemVariant } from '@/constants/order';
import { OrderedObjectInfo } from '@/schemas/order';

import OrderItem from './OrderItem';

type OrderItemsSectionProps = {
    orderItems?: OrderedObjectInfo[];
    variant: OrderItemVariant;
};

export default function OrderItemsSection({
    orderItems,
    variant,
}: OrderItemsSectionProps) {
    return (
        <>
            <header>
                <h2 className="text-body-01 font-semibold">주문 상품</h2>
            </header>

            <div className="space-y-3">
                {orderItems?.map((orderItem) => (
                    <div
                        key={orderItem.objectId}
                        className="not-last:border-b not-last:border-gray-regular not-last:pb-3"
                    >
                        <OrderItem item={orderItem} variant={variant} />
                    </div>
                ))}
            </div>
        </>
    );
}
