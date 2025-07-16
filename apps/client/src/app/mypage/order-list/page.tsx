import Divider from '@/components/features/mypage/Divider';
import ProductItemByDeliveryState from '@/components/features/mypage/ProductItemByDeliveryState';
import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <div>
            <Header type="title" title="주문 내역" />
            {/* 탭 추가 */}

            {[[0, 1], [2], [3]].map((arr) => (
                <div key={arr[0]}>
                    <div className="space-y-4 px-5 py-6">
                        <div className="text-headline-04">2025.04.25</div>
                        <div className="space-y-5">
                            {arr.map((item) => (
                                <ProductItemByDeliveryState
                                    key={item}
                                    type="order"
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                </div>
            ))}
        </div>
    );
}
