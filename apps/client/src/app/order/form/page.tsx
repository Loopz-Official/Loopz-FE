'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import BottomFixedButton from '@/components/common/Button/BottomFixed';
import AddressSection from '@/components/features/order/form/AddressSection';
import PriceSummarySection from '@/components/features/order/form/PriceSummarySection';
import AgreementSection from '@/components/features/order/form/TermsSection';
import OrderItemsSection from '@/components/features/order/OrderItemsSection';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { ORDER_TERMS } from '@/constants/terms';
import { useTermsCheck } from '@/hooks/check';
import { usePlaceOrderAndPaymentMutation } from '@/hooks/mutations/useOrderMutation';
import { useAddressListQuery } from '@/hooks/queries/useAddressQuery';
import { useSelectedObjectInfosQuery } from '@/hooks/queries/useObjectQuery';
import { useSelectedAddressIdStore } from '@/hooks/stores/useSelectedAddressIdStore';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { AddressInfo } from '@/schemas/address';
import { completePayment } from '@/services/api/payment/completePayment';
import { formatPrice } from '@/utils/formatPrice';
import { getOrderName } from '@/utils/order/getOrderName';
import { getPriceSummary } from '@/utils/order/getPrice';

export type DeliveryRequest = {
    option: string;
    customText: string;
};

export default function OrderFormPage() {
    // 결제 상태 (Portone Server)
    // const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    //     paymentStatusEnum.enum.IDLE
    // );

    // 배송지 선택
    const [activeAddressInfo, setActiveAddressInfo] = useState<AddressInfo>();
    const { selectedAddressId, setSelectedAddressId } =
        useSelectedAddressIdStore();

    // 배송 요청사항
    const [deliveryRequest, setDeliveryRequest] = useState<DeliveryRequest>({
        option: '',
        customText: '',
    });

    // 주문 예정 상품
    const { selectedProducts } = useSelectedProductsStore();
    const { data: selectedObjectInfos } =
        useSelectedObjectInfosQuery(selectedProducts);

    // 📌 주문 생성 후 결제 요청 (mutation 성공 시 chain onSuccess 처리)
    const { mutate: placeOrderAndPay } = usePlaceOrderAndPaymentMutation();

    // 주문 상품 정보 유효성 체크
    const safeSelectedObjectInfos = useMemo(
        () => selectedObjectInfos ?? [],
        [selectedObjectInfos]
    );

    // 결제건 이름 (For Portone request)
    const orderName = useMemo(
        () => getOrderName(safeSelectedObjectInfos),
        [safeSelectedObjectInfos]
    );

    // 주문 금액 요약
    const { productPrice, totalPrice } = useMemo(
        () => getPriceSummary(safeSelectedObjectInfos),
        [safeSelectedObjectInfos]
    );

    // 배송지 목록 조회
    const { data: addressList, isLoading, error } = useAddressListQuery();

    const termsCheck = useTermsCheck(ORDER_TERMS);
    const { isAllMandatoryChecked } = termsCheck;

    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const router = useRouter();

    /**
     * redirection(쿼리스트링) 방식 (모바일 환경 대응)
     * 결제 요청 후 쿼리스트링에 paymentId, code가 있으면 후처리
     */
    useEffect(() => {
        const paymentId = searchParams.get('paymentId');
        const code = searchParams.get('code');
        const message = searchParams.get('message');
        const orderId = searchParams.get('orderId');
        const safeMessage = typeof message === 'string' ? message : undefined;

        // 쿼리스트링에 paymentId, code 둘 다 없으면 아무 동작도 하지 않음 (일반 진입)
        if (!paymentId && !code) return;

        // 결제 실패/취소 등 에러 상황
        if (code !== null || !paymentId) {
            toast.error(safeMessage || '결제가 취소되었거나 실패했습니다.');
            return;
        }

        // orderId가 있으면 바로 라우팅
        if (paymentId && orderId) {
            completePayment(paymentId).then((orderData) => {
                // 주문 상세 캐싱
                queryClient.setQueryData(
                    ['order-detail', orderData.orderId],
                    orderData
                );
                // 결제 완료 페이지로 라우팅
                router.push(`/order/complete?orderId=${orderData.orderId}`);
            });
        }
    }, [searchParams, queryClient, router]);

    // 선택된 배송지 정보 설정
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

    // 배송지 유효성 체크 함수 (For order button click handler)
    const validateAddress = () => {
        if (!activeAddressInfo) {
            toast.error('배송지 정보를 입력해주세요.');
            return false;
        }
        return true;
    };

    // 배송 요청사항 가공 함수 (For order button click handler)
    const getDeliveryRequestText = () => {
        if (deliveryRequest.option === '직접 입력') {
            return deliveryRequest.customText;
        }
        return deliveryRequest.option;
    };

    // 주문 버튼 클릭 핸들러
    const handleOrderButtonClick = () => {
        if (!validateAddress()) return;
        const deliveryRequestText = getDeliveryRequestText();

        placeOrderAndPay({
            orderRequest: {
                objects: selectedProducts,
                addressId: activeAddressInfo!.addressId,
                agreedToTerms: isAllMandatoryChecked,
                deliveryRequest: deliveryRequestText,
                paymentMethod: 'NICE_PAY',
            },
            orderName,
            totalPrice,
        });
    };

    // const isWaitingPayment = paymentStatus !== paymentStatusEnum.enum.IDLE;

    const isOrderButtonDisabled =
        // 배송지 정보가 없을 때
        !activeAddressInfo ||
        // 필수 약관 미동의 시
        !isAllMandatoryChecked;
    // 결제 대기 중일 때
    // isWaitingPayment;

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
                        items={safeSelectedObjectInfos}
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
                isDisabled={isOrderButtonDisabled}
                onClick={handleOrderButtonClick}
            />
        </div>
    );
}
