'use client';

import { useState } from 'react';

import BottomButton from '@/components/features/order/BottomButton';
import AddressSection from '@/components/features/order/form/AddressSection';
import AgreementSection from '@/components/features/order/form/AgreementSection';
import OrderItemsSection from '@/components/features/order/form/OrderItemsSection';
import PriceSummarySection from '@/components/features/order/form/PriceSummarySection';

export default function Page() {
    const [hasAddressInfo, setHasAddressInfo] = useState(false);
    const [hasAgreedToRequiredTerms, setHasAgreedToRequiredTerms] =
        useState(false);

    const isDisabled = !(hasAddressInfo && hasAgreedToRequiredTerms);

    return (
        <div>
            {/* 헤더 */}

            <div className="flex flex-col px-5 pt-2">
                {/* 배송지 정보 */}
                <div className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <AddressSection setHasAddressInfo={setHasAddressInfo} />
                </div>

                {/* 주문 상품 */}
                <div className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <OrderItemsSection />
                </div>

                {/* 결제 금액 */}
                <div className="flex flex-col border-t border-black pb-5 pt-5">
                    <PriceSummarySection />
                </div>

                {/* 약관 동의 */}
                <div className="flex flex-col border-t border-black pb-12 pt-5">
                    <AgreementSection
                        setHasAgreedToRequiredTerms={
                            setHasAgreedToRequiredTerms
                        }
                    />
                </div>
            </div>

            {/* 버튼 */}
            <BottomButton
                text={'21,000원 결제하기'}
                isDisabled={isDisabled}
                onClick={() => {}}
            />
        </div>
    );
}
