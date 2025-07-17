import Divider from '@/components/features/mypage/Divider';
import ProductItemByDeliveryState from '@/components/features/mypage/ProductItemByDeliveryState';
import ReturnDetail from '@/components/features/mypage/return-detail/ReturnDetail';
import ReturnPaymentSummary from '@/components/features/mypage/return-detail/ReturnPaymentSummary';
import Header from '@/components/layouts/Header';

export default function Page() {
    // product status에 따라 취소 요청 또는 취소 완료 상태이면 true
    const isCancel = false;

    // product status에 따라 취소 완료 또는 반품 완료 상태이면 true
    const isCompleted = false;

    return (
        <div>
            <Header type="title" title="취소 상세" />
            <div className="text-body-03 text-gray-dark px-5 py-2.5 font-normal">
                {`접수하신 제품의 ${isCancel ? '취소가' : '반품/환불이'} ${isCompleted ? '완료' : '요청'}되었어요.`}
            </div>

            <Divider />

            {/* 취소 상품 */}
            <div className="space-y-5 px-5 py-6">
                <ProductItemByDeliveryState isDetailPage type="return" />
            </div>

            <Divider />

            {/* 수령 정보 */}
            <div className="px-5 py-6">
                <ReturnDetail />
            </div>

            <Divider />

            {/* 결제 내역 */}
            <div className="px-5 py-6">
                <ReturnPaymentSummary
                    totalProductPrice={21000}
                    shippingFee={3000}
                    totalPayment={24000}
                />
            </div>

            {/* TODO: 하단 버튼 추가 필요 */}
        </div>
    );
}
