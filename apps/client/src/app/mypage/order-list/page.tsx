import PaymentSummary from '@/components/features/mypage/order-list/PaymentSummary';
import ReceiptInformation from '@/components/features/mypage/order-list/ReceiptInformation';
import ProductItemByDeliveryState from '@/components/features/mypage/order-return-list/ProductItemByDeliveryState';

export default function Page() {
    return (
        <div>
            <ProductItemByDeliveryState type="order" />
            <ReceiptInformation />
            <PaymentSummary />
        </div>
    );
}
