'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import AddressSection from '@/components/features/order/form/AddressSection';
import PriceSummarySection from '@/components/features/order/form/PriceSummarySection';
import AgreementSection from '@/components/features/order/form/TermsSection';
import OrderItemsSection from '@/components/features/order/OrderItemsSection';
import Header from '@/components/layouts/Header';
import { OrderFrom } from '@/constants/order';
import { ORDER_TERMS } from '@/constants/terms';
import { useTermsCheck } from '@/hooks/check';
import { useAddressListQuery } from '@/hooks/queries/useAddressQuery';
import { useBaseOrderRequestStore } from '@/hooks/stores/useBaseOrderRequestStore';
import { useSelectedAddressIdStore } from '@/hooks/stores/useSelectedAddressIdStore';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { AddressInfo } from '@/schemas/address';
import { formatPrice } from '@/utils/formatPrice';
import { getPriceSummary } from '@/utils/order/getPrice';
import { getOrderFromQueryString } from '@/utils/route';

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
    const { selectedAddressId, setSelectedAddressId } =
        useSelectedAddressIdStore();

    // deliveryRequest로 네이밍 변경
    const [deliveryRequest, setDeliveryRequest] = useState<DeliveryRequest>({
        option: null,
        customText: '',
    });

    // 약관 체크 상태 관리
    const termsCheck = useTermsCheck(ORDER_TERMS);
    const isAllTermsChecked = termsCheck.isAllMandatoryChecked;

    const isDisabled = !(activeAddressInfo && isAllTermsChecked);

    const { products } = useSelectedProductsStore();
    const { productPrice, totalPrice } = getPriceSummary(products);

    const { setBaseOrderRequest } = useBaseOrderRequestStore();

    // 배송지 목록 쿼리
    const { data: addressList, isLoading, error } = useAddressListQuery();

    // 페이지 진입 시 기본 배송지 설정
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

    // 결제 버튼 클릭 핸들러 분리
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

        router.push(`/order/confirm?${getOrderFromQueryString(orderFrom)}`);
    };

    return (
        <div className="pb-17">
            <Header type="title" title="주문/결제" />

            <div className="flex flex-col px-5 pt-2">
                {/* 배송지 정보 */}
                <section className="flex flex-col gap-3 border-t border-black pb-8 pt-4">
                    <AddressSection
                        orderFrom={orderFrom}
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
                    <OrderItemsSection variant="default" />
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

            {/* 버튼 */}
            <BottomButton
                text={`${formatPrice(totalPrice)} 원 결제하기`}
                isDisabled={isDisabled}
                onClick={handleOrderButtonClick}
            />
        </div>
    );
}
