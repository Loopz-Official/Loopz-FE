'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import AddressSection from '@/components/features/order/form/AddressSection';
import AgreementSection from '@/components/features/order/form/AgreementSection';
import PriceSummarySection from '@/components/features/order/form/PriceSummarySection';
import OrderItemsSection from '@/components/features/order/OrderItemsSection';
import Header from '@/components/layouts/Header';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { AddressInfo } from '@/schemas/address';
import { getTotalPrice } from '@/utils/order/getPrice';

export default function OrderFormPageContent({
    type,
}: {
    type: 'cart' | 'detail';
}) {
    const [activeAddressInfo, setActiveAddressInfo] = useState<AddressInfo>();
    const [deliveryRequest, setDeliveryRequest] = useState<string | null>(null);
    const [textareaContent, setTextareaContent] = useState('');
    const [hasAgreedToRequiredTerms, setHasAgreedToRequiredTerms] =
        useState(false);

    const isDisabled = !(activeAddressInfo && hasAgreedToRequiredTerms);
    const router = useRouter();

    const { products } = useSelectedProductsStore();
    const totalPrice = getTotalPrice(products);

    return (
        <div className="pb-17">
            <Header type="title" title="주문/결제" />

            <div className="flex flex-col px-5 pt-2">
                {/* 배송지 정보 */}
                <section className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <AddressSection
                        onActiveAddressInfoChange={setActiveAddressInfo}
                        deliveryRequest={deliveryRequest}
                        setDeliveryRequest={setDeliveryRequest}
                        textareaContent={textareaContent}
                        setTextareaContent={setTextareaContent}
                    />
                </section>

                {/* 주문 상품 */}
                <section className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <OrderItemsSection variant="default" />
                </section>

                {/* 결제 금액 */}
                <section className="flex flex-col border-t border-black pb-5 pt-5">
                    <PriceSummarySection />
                </section>

                {/* 약관 동의 */}
                <section className="flex flex-col border-t border-black pb-5 pt-5">
                    <AgreementSection
                        setHasAgreedToRequiredTerms={
                            setHasAgreedToRequiredTerms
                        }
                    />
                </section>
            </div>

            {/* 버튼 */}
            <BottomButton
                text={`${totalPrice.toLocaleString()}원 결제하기`}
                isDisabled={isDisabled}
                onClick={() => router.push(`/order/confirm/${type}`)}
            />
        </div>
    );
}
