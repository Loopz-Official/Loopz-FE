import Divider from '@/components/features/mypage/Divider';
import OrderPaymentSummary from '@/components/features/mypage/order-detail/OrderPaymentSummary';
import ReceiptInformation from '@/components/features/mypage/order-detail/ReceiptInformation';
import ProductItemByDeliveryState from '@/components/features/mypage/ProductItemByDeliveryState';
import Header from '@/components/layouts/Header';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div>
            <Header type="title" title="주문 상세" />
            <div className="text-body-03 text-gray-dark px-5 py-2.5 font-normal">
                주문번호: {id}
            </div>

            <Divider />

            {/* 주문 상품 */}
            <div className="space-y-5 px-5 py-6">
                <ProductItemByDeliveryState isDetailPage type="order" />
                <ProductItemByDeliveryState isDetailPage type="order" />
            </div>

            <Divider />

            {/* 수령 정보 */}
            <div className="px-5 py-6">
                <ReceiptInformation />
            </div>

            <Divider />

            {/* 결제 내역 */}
            <div className="px-5 py-6">
                <OrderPaymentSummary
                    totalProductPrice={21000}
                    shippingFee={3000}
                    totalPayment={24000}
                    paymentMethod="BANK_TRANSFER"
                />
            </div>

            {/* TODO: 하단 버튼 추가 필요 */}
        </div>
    );
}
