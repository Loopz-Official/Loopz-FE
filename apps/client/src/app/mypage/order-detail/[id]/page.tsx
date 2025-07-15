import Divider from '@/components/features/mypage/Divider';
import PaymentSummary from '@/components/features/mypage/order-list/PaymentSummary';
import ReceiptInformation from '@/components/features/mypage/order-list/ReceiptInformation';
import ProductItemByDeliveryState from '@/components/features/mypage/order-return-list/ProductItemByDeliveryState';
import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <div>
            <Header type="title" title="주문 상세" />

            {/* TODO: 주문 번호 섹션 필요 */}

            <Divider />

            {/* 주문 상품 */}
            <div className="space-y-5 px-5 py-6">
                <ProductItemByDeliveryState type="order" />
                <ProductItemByDeliveryState type="order" />
            </div>

            <Divider />

            {/* 수령 정보 */}
            <div className="px-5 py-6">
                <ReceiptInformation />
            </div>

            <Divider />

            {/* 결제 내역 */}
            <div className="px-5 py-6">
                <PaymentSummary />
            </div>

            {/* TODO: 하단 버튼 추가 필요 */}
        </div>
    );
}
