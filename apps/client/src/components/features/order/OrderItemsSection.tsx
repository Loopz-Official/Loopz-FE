import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';

import OrderItem, { OrderItemProps } from './OrderItem';

export default function OrderItemsSection({ variant }: OrderItemProps) {
    const { products } = useSelectedProductsStore();

    return (
        <>
            <header>
                <h2 className="text-body-01 font-semibold">주문 상품</h2>
            </header>

            <div className="space-y-3">
                {products.map((product, i) => (
                    <div
                        key={i}
                        className="not-last:border-b not-last:border-gray-regular not-last:pb-3"
                    >
                        <OrderItem item={product} variant={variant} />
                    </div>
                ))}
            </div>
        </>
    );
}
