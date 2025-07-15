import ProductItemByDeliveryState from '@/components/features/mypage/order-return-list/ProductItemByDeliveryState';
import ReturnDetail from '@/components/features/mypage/return-list/ReturnDetail';

export default function Page() {
    return (
        <div>
            <ProductItemByDeliveryState type="return" />
            <ReturnDetail />
        </div>
    );
}
