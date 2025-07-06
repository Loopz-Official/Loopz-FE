'use client';

import clsx from 'clsx';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

import Header from '@/components/layouts/Header';
import {
    ORDER_CONFIRM_ITEMS,
    ORDER_CONFIRM_NOTICE,
} from '@/constants/orderConfirm';
import { useCheckGroup } from '@/hooks/check/useCheckGroup';
import { usePlaceOrderMutation } from '@/hooks/mutations/useOrderMutation';
import { useBaseOrderRequestStore } from '@/hooks/stores/useBaseOrderRequestStore';
import { useSelectedAddressIdStore } from '@/hooks/stores/useSelectedAddressIdStore';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import {
    cartOrderRequest,
    detailOrderRequest,
    paymentMethodEnum,
} from '@/schemas/order';
import { validate } from '@/schemas/utils/validate';

export default function OrderConfirmPage() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const orderFrom = searchParams.get('orderFrom');
    if (orderFrom !== 'cart' && orderFrom !== 'detail') notFound();

    // 체크 항목 key 배열 추출
    const checkKeys = useMemo(
        () => ORDER_CONFIRM_ITEMS.map((item) => item.key),
        []
    );
    const { isChecked, isAllChecked, toggle } = useCheckGroup(checkKeys, false);

    const { products, clearProducts } = useSelectedProductsStore();
    const { clearSelectedAddressId } = useSelectedAddressIdStore();
    const { addressId, deliveryRequest, agreedToTerms, clearBaseOrderRequest } =
        useBaseOrderRequestStore();

    const placeOrderMutation = usePlaceOrderMutation();

    const handleBottomButtonClick = async () => {
        try {
            const baseRequest = {
                addressId,
                paymentMethod: paymentMethodEnum.enum.BANK_TRANSFER,
                deliveryRequest,
                agreedToTerms,
            };

            const productIds = products.map((product) => product.objectId);

            // 주문 타입에 따른 분리된 처리
            if (orderFrom === 'cart') {
                const cartRequestData = {
                    ...baseRequest,
                    objectIds: productIds,
                };
                const validatedCartRequest = validate(
                    cartOrderRequest,
                    cartRequestData,
                    'Cart Order Request'
                );
                await placeOrderMutation.mutateAsync({
                    orderFrom: 'cart',
                    data: validatedCartRequest,
                });
            } else {
                const [singleProduct] = products;
                if (!singleProduct) {
                    toast.error('주문할 상품이 없습니다');
                    return;
                }

                const detailRequestData = {
                    ...baseRequest,
                    quantity: singleProduct.quantity,
                };
                const validatedDetailRequest = validate(
                    detailOrderRequest,
                    detailRequestData,
                    'Detail Order Request'
                );
                await placeOrderMutation.mutateAsync({
                    orderFrom: 'detail',
                    data: {
                        ...validatedDetailRequest,
                        objectId: singleProduct.objectId,
                    },
                });
            }

            // 주문 완료 후 관련 모든 전역 상태 스토리지 내 제거
            clearBaseOrderRequest();
            clearProducts();
            clearSelectedAddressId();

            router.replace('/order/complete');
        } catch (error) {
            console.error(error);
            alert(
                '주문 확인 중 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.'
            );
        }
    };

    const renderCheckbox = (itemKey: string) => {
        return (
            <label className="mt-5 flex w-fit cursor-pointer items-center gap-2">
                <input
                    type="checkbox"
                    checked={isChecked(itemKey)}
                    onChange={() => toggle(itemKey)}
                    className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-5 w-5 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
                />
                <span className="text-body-03 text-gray-dark font-normal">
                    네! 확인했습니다.
                </span>
            </label>
        );
    };

    return (
        <div className="pb-27">
            <Header type="title" title="이체하기" />

            <div className="space-y-[1.875rem] break-keep px-5 pt-[0.875rem]">
                <div className="text-caption-01 text-status-red font-medium">
                    *{ORDER_CONFIRM_NOTICE}
                </div>

                {ORDER_CONFIRM_ITEMS.map((item, idx) => {
                    return (
                        <div key={item.key}>
                            <h2
                                className="text-headline-04"
                                dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                            {item.description && (
                                <div
                                    className={clsx(
                                        'text-body-03 text-gray-dark mt-1 font-normal',
                                        idx === 1 &&
                                            'text-body-02 font-semibold'
                                    )}
                                    dangerouslySetInnerHTML={{
                                        __html: item.description,
                                    }}
                                />
                            )}
                            {renderCheckbox(item.key)}
                        </div>
                    );
                })}
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
