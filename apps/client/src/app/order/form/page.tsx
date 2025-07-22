'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomFixedButton from '@/components/common/Button/BottomFixed';
import AddressSection from '@/components/features/order/form/AddressSection';
import PriceSummarySection from '@/components/features/order/form/PriceSummarySection';
import AgreementSection from '@/components/features/order/form/TermsSection';
import OrderItemsSection from '@/components/features/order/OrderItemsSection';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { ORDER_TERMS } from '@/constants/terms';
import { useTermsCheck } from '@/hooks/check';
import { useAddressListQuery } from '@/hooks/queries/useAddressQuery';
import { useSelectedObjectInfosQuery } from '@/hooks/queries/useObjectQuery';
import { useBaseOrderRequestStore } from '@/hooks/stores/useBaseOrderRequestStore';
import { useSelectedAddressIdStore } from '@/hooks/stores/useSelectedAddressIdStore';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { AddressInfo } from '@/schemas/address';
import { formatPrice } from '@/utils/formatPrice';
import { getPriceSummary } from '@/utils/order/getPrice';

export type DeliveryRequest = {
    option: string | null;
    customText: string;
};

export default function OrderFormPage() {
    const router = useRouter();

    // 배송지 선택
    const [activeAddressInfo, setActiveAddressInfo] = useState<AddressInfo>();
    const { selectedAddressId, setSelectedAddressId } =
        useSelectedAddressIdStore();

    // 배송 요청사항
    const [deliveryRequest, setDeliveryRequest] = useState<DeliveryRequest>({
        option: null,
        customText: '',
    });

    // 주문 예정 상품
    const { selectedProducts } = useSelectedProductsStore();
    const { data: selectedObjectInfos } =
        useSelectedObjectInfosQuery(selectedProducts);

    const { productPrice, totalPrice } = getPriceSummary(
        selectedObjectInfos ?? []
    );

    // 주문 생성을 위한 전역 상태 (결제 시스템 도입 시 삭제 예정)
    const { setBaseOrderRequest } = useBaseOrderRequestStore();
    const { data: addressList, isLoading, error } = useAddressListQuery();

    const termsCheck = useTermsCheck(ORDER_TERMS);
    const isAllTermsChecked = termsCheck.isAllMandatoryChecked;

    const isDisabled = !(activeAddressInfo && isAllTermsChecked);

    useEffect(() => {
        const info =
            !addressList || addressList.length === 0
                ? undefined
                : (selectedAddressId &&
                      addressList.find(
                          (addr) => addr.addressId === selectedAddressId
                      )) ||
                  addressList.find((addr) => addr.defaultAddress) ||
                  addressList[0];

        if (info) {
            setActiveAddressInfo(info);
            if (!selectedAddressId || info.addressId !== selectedAddressId) {
                setSelectedAddressId(info.addressId);
            }
        } else {
            setActiveAddressInfo(undefined);
        }
    }, [addressList, selectedAddressId, setSelectedAddressId]);

    const onDeliveryRequestChange = <K extends keyof DeliveryRequest>(
        key: K,
        value: DeliveryRequest[K]
    ) => {
        setDeliveryRequest((prev) => ({ ...prev, [key]: value }));
    };

    const handleOrderButtonClick = () => {
        if (!activeAddressInfo) return;
        const request =
            deliveryRequest.option === '직접 입력'
                ? deliveryRequest.customText
                : deliveryRequest.option;
        setBaseOrderRequest({
            addressId: activeAddressInfo.addressId,
            deliveryRequest: request ?? '',
            agreedToTerms: isAllTermsChecked,
        });

        router.push(`/order/confirm`);
    };

    return (
        <div className="pb-17">
            <Header type="title" title="주문/결제" />
            <div className="flex flex-col px-5 pt-2">
                {/* 배송지 정보 */}
                <section className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <AddressSection
                        activeAddressInfo={activeAddressInfo}
                        addressList={addressList ?? []}
                        deliveryRequest={deliveryRequest}
                        onDeliveryRequestChange={onDeliveryRequestChange}
                        isLoading={isLoading}
                        error={error}
                    />
                </section>
                {/* 주문 상품 */}
                <section className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <OrderItemsSection
                        variant="form"
                        items={selectedObjectInfos ?? []}
                    />
                </section>
                {/* 결제 금액 */}
                <section className="flex flex-col border-t border-black pb-5 pt-5">
                    <PriceSummarySection
                        productPrice={productPrice}
                        totalPrice={totalPrice}
                    />
                </section>
                {/* 약관 동의 */}
                <section className="flex flex-col border-t border-black pb-5 pt-5">
                    <AgreementSection termsCheck={termsCheck} />
                </section>
            </div>

            <div className="mt-20">
                <Footer />
            </div>

            {/* 버튼 */}
            <BottomFixedButton
                text={`${formatPrice(totalPrice)} 원 결제하기`}
                isDisabled={isDisabled}
                onClick={handleOrderButtonClick}
            />
        </div>
    );
}
