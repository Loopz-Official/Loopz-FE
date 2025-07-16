'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import Header from '@/components/layouts/Header';
import {
    ORDER_CONFIRM_ITEMS,
    ORDER_CONFIRM_NOTICE,
} from '@/constants/orderConfirm';
import { useCheckGroup } from '@/hooks/check/useCheckGroup';
import { usePlaceOrderMutation } from '@/hooks/mutations/useOrderMutation';
import { useSelectedObjectInfosQuery } from '@/hooks/queries/useObjectQuery';
import { useBaseOrderRequestStore } from '@/hooks/stores/useBaseOrderRequestStore';
import { useSelectedAddressIdStore } from '@/hooks/stores/useSelectedAddressIdStore';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { orderRequest, paymentMethodEnum } from '@/schemas/order';
import { validate } from '@/schemas/utils/validate';

export default function OrderConfirmPageContent() {
    const router = useRouter();

    const { selectedProducts, clearSelectedProducts } =
        useSelectedProductsStore();
    const { data: selectedObjectInfos } =
        useSelectedObjectInfosQuery(selectedProducts);

    const checkKeys = useMemo(
        () => ORDER_CONFIRM_ITEMS.map((item) => item.key),
        []
    );
    const { isChecked, isAllChecked, toggle } = useCheckGroup(checkKeys, false);
    const { clearSelectedAddressId } = useSelectedAddressIdStore();
    const { addressId, deliveryRequest, agreedToTerms, clearBaseOrderRequest } =
        useBaseOrderRequestStore();
    const placeOrderMutation = usePlaceOrderMutation();

    const handleBottomButtonClick = async () => {
        try {
            const orderInfos = {
                objects: selectedObjectInfos,
                paymentMethod: paymentMethodEnum.enum.BANK_TRANSFER,
                addressId,
                deliveryRequest,
                agreedToTerms,
            };

            const validatedOrderRequest = validate(
                orderRequest,
                orderInfos,
                'Order Request'
            );

            const responseData = await placeOrderMutation.mutateAsync(
                validatedOrderRequest
            );
            const { orderId } = responseData;

            // 주문 완료 후 관련 모든 전역 상태 스토리지 내 제거
            clearBaseOrderRequest();
            clearSelectedProducts();
            clearSelectedAddressId();

            router.replace(`/order/complete?orderId=${orderId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const renderCheckbox = (itemKey: string) => (
        <label className="mt-5 flex w-fit cursor-pointer items-center gap-2">
            <input
                type="checkbox"
                checked={isChecked(itemKey)}
                onChange={() => toggle(itemKey)}
                className="border-gray-09 rounded-xs not-checked:bg-[url('/checkbox/unchecked.svg')] relative h-5 w-5 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checkbox/checked.svg')]"
            />
            <span className="text-body-03 text-gray-dark font-normal">
                네! 확인했습니다.
            </span>
        </label>
    );

    return (
        <div className="pb-27">
            <Header type="title" title="이체하기" />

            <div className="space-y-[1.875rem] break-keep px-5 pt-[0.875rem]">
                <div className="text-caption-01 text-status-red font-medium">
                    *{ORDER_CONFIRM_NOTICE}
                </div>
                {ORDER_CONFIRM_ITEMS.map((item, idx) => (
                    <div key={item.key}>
                        <h2
                            className="text-headline-04"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        {item.description && (
                            <div
                                className={clsx(
                                    'text-body-03 text-gray-dark mt-1 font-normal',
                                    idx === 1 && 'text-body-02 font-semibold'
                                )}
                                dangerouslySetInnerHTML={{
                                    __html: item.description,
                                }}
                            />
                        )}
                        {renderCheckbox(item.key)}
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 w-full max-w-2xl bg-white p-5 pb-8">
                <button
                    disabled={!isAllChecked}
                    onClick={handleBottomButtonClick}
                    className="text-body-02 disabled:bg-button-disabled flex h-14 w-full items-center justify-center rounded-[0.25rem] bg-black text-white"
                >
                    계속하기
                </button>
            </div>
        </div>
    );
}
