import PaymentSummary from '@/components/features/mypage/detail/PaymentSummary';
import Divider from '@/components/features/mypage/Divider';
import ProductItemByDeliveryState from '@/components/features/mypage/ProductItemByDeliveryState';
import ReturnDetail from '@/components/features/mypage/return-detail/ReturnDetail';
import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <div>
            <Header type="title" title="취소/반품 상세" />
            <div className="text-body-03 text-gray-dark px-5 py-2.5 font-normal">
                접수하신 제품의 반품/환불이 완료되었어요.
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
                <PaymentSummary />
            </div>

            {/* TODO: 하단 버튼 추가 필요 */}
        </div>
    );
}
