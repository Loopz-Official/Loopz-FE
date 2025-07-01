'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BottomButton from '@/components/common/BottomButton';
import PaymentMethodSection from '@/components/features/order/complete/PaymentMethod';
import OrderItemsSection from '@/components/features/order/OrderItemsSection';
import Header from '@/components/layouts/Header';
import { ORDER_NOTIFICATIONS } from '@/constants/orderNotifications';

export default function Page() {
    const router = useRouter();

    return (
        <div className="pb-17">
            <Header type="pop-up" title="주문완료" />

            <div className="px-5">
                {/* 아이콘 */}
                <div className="mb-9 mt-12 flex flex-col items-center text-center">
                    <Image
                        priority
                        src={'/gift.svg'}
                        alt="gift"
                        width={160}
                        height={160}
                        className="mb-2"
                    />
                    <h3 className="text-body-01 font-semibold">
                        주문이 완료되었어요!
                    </h3>
                    <span className="text-caption-01 text-gray-dark font-semibold">
                        입금정보를 24시간 이내로 확인한 이후, 발송할 예정입니다.
                    </span>
                    <span className="text-caption-01 text-gray-regular mt-2.5">
                        평균 배송 소요 기간은 2-3일이며,
                        <br />
                        배송 현황은 마이페이지에서 조회 가능합니다.
                    </span>
                </div>

                {/* 주문 상품 */}
                <div className="flex flex-col gap-3 border-t border-black pb-6 pt-3">
                    <OrderItemsSection variant="secondary" />
                </div>

                {/* 결제 수단 */}
                <div className="pb-13 flex flex-col border-t border-black pt-3">
                    <PaymentMethodSection />
                </div>
            </div>

            {/* 푸터 */}
            <footer className="border-gray-regular text-caption-02 text-gray-regular border-t p-5">
                <ul className="list-disc space-y-4 pl-5">
                    {ORDER_NOTIFICATIONS.map((notification) => (
                        <li key={notification} className="marker:text-[10px]">
                            {notification}
                        </li>
                    ))}
                </ul>
            </footer>

            <BottomButton
                text="다른 상품 둘러보러 가기"
                isDisabled={false}
                onClick={() => router.replace('/main')}
            />
        </div>
    );
}
