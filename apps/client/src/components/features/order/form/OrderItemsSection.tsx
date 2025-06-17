import OrderItem from './OrderItem';

export default function OrderItemsSection() {
    return (
        <>
            <header>
                <h2 className="text-body-01 font-semibold">주문 상품</h2>
            </header>

            <div className="space-y-3">
                {new Array(3).fill(null).map((_, i) => (
                    <div
                        key={i}
                        className="not-last:border-b not-last:border-gray-regular not-last:pb-3"
                    >
                        <OrderItem />
                    </div>
                ))}
            </div>
        </>
    );
}
