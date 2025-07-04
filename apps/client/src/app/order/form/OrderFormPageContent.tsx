'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import AddressSection from '@/components/features/order/form/AddressSection';
import AgreementSection from '@/components/features/order/form/AgreementSection';
import PriceSummarySection from '@/components/features/order/form/PriceSummarySection';
import OrderItemsSection from '@/components/features/order/OrderItemsSection';
import Header from '@/components/layouts/Header';
import { OrderFrom } from '@/constants/order';
import { useBaseOrderRequestStore } from '@/hooks/stores/useBaseOrderRequestStore';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { AddressInfo } from '@/schemas/address';
import { formatPrice } from '@/utils/formatPrice';
import { getTotalPrice } from '@/utils/order/getPrice';

export type DeliveryRequest = {
    option: string | null;
    customText: string;
};

export default function OrderFormPageContent({
    orderFrom,
}: {
    orderFrom: OrderFrom;
}) {
    const router = useRouter();

    const [activeAddressInfo, setActiveAddressInfo] = useState<AddressInfo>();

    // deliveryRequest로 네이밍 변경
    const [deliveryRequest, setDeliveryRequest] = useState<DeliveryRequest>({
        option: null,
        customText: '',
    });

    const [hasAgreedToRequiredTerms, setHasAgreedToRequiredTerms] =
        useState(false);

    const isDisabled = !(activeAddressInfo && hasAgreedToRequiredTerms);

    const { products } = useSelectedProductsStore();
    const totalPrice = getTotalPrice(products);

    const { setBaseOrderRequest } = useBaseOrderRequestStore();

    // 배송지 저장
    useEffect(() => {
        if (activeAddressInfo) {
            setBaseOrderRequest({ addressId: activeAddressInfo.addressId });
        }
    }, [activeAddressInfo, setBaseOrderRequest]);

    // 배송 요청사항 저장
    useEffect(() => {
        let request = deliveryRequest.option;
        if (
            deliveryRequest.option === '직접 입력' &&
            deliveryRequest.customText
        ) {
            request = deliveryRequest.customText;
        }
        if (request) {
            setBaseOrderRequest({ deliveryRequest: request });
        }
    }, [deliveryRequest, setBaseOrderRequest]);

    // 약관 동의 저장
    useEffect(() => {
        if (hasAgreedToRequiredTerms) {
            setBaseOrderRequest({ agreedToTerms: hasAgreedToRequiredTerms });
        }
    }, [hasAgreedToRequiredTerms, setBaseOrderRequest]);

    // Delivery request handler
    const onDeliveryRequestChange = <K extends keyof DeliveryRequest>(
        key: K,
        value: DeliveryRequest[K]
    ) => {
        setDeliveryRequest((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="pb-17">
            <Header type="title" title="주문/결제" />

            <div className="flex flex-col px-5 pt-2">
                {/* 배송지 정보 */}
                <section className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <AddressSection
                        orderFrom={orderFrom}
                        onActiveAddressInfoChange={setActiveAddressInfo}
                        deliveryRequest={deliveryRequest}
                        onDeliveryRequestChange={onDeliveryRequestChange}
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
                text={`${formatPrice(totalPrice)} 원 결제하기`}
                isDisabled={isDisabled}
                onClick={() =>
                    router.push(`/order/confirm?orderFrom=${orderFrom}`)
                }
            />
        </div>
    );
}
