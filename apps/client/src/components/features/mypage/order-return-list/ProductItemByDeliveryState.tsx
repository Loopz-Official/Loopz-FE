import clsx from 'clsx';
import Image from 'next/image';

import {
    OrderListDeliveryStates,
    ReturnListDeliveryStates,
} from '@/constants/deliveryState';
import { formatPrice } from '@/utils/formatPrice';

export default function ProductItemByDeliveryState({
    type,
    isDetailPage = false,
}: {
    type: 'order' | 'return';
    isDetailPage?: boolean;
}) {
    const isOrderList = type === 'order';

    // 추후 props로 전달
    const product = {
        objectName: '이름이름이름',
        intro: '설명설명설명설명설명설명',
        objectPrice: 10000,
        imageUrl: '/banner/01.png',
        status: isOrderList ? 'PURCHASE_CONFIRMED' : 'CANCELED_REQUESTED',
    };

    const deliveryStates = isOrderList
        ? OrderListDeliveryStates
        : ReturnListDeliveryStates;
    const currentDeliveryState = deliveryStates.find(
        (state) => state.label === product.status
    )!;

    const buttonClass =
        'grow h-10 flex justify-center items-center rounded-md border border-button-gray-regular text-body-03';

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <div
                    className={clsx(
                        'text-body-03',
                        isOrderList ? 'text-status-blue' : 'text-gray-regular'
                    )}
                >
                    {currentDeliveryState.value}
                </div>
                {!isDetailPage && (
                    <button className="text-caption-02 text-gray-regular underline underline-offset-4">
                        {isOrderList ? '주문 상세' : '취소 상세'}
                    </button>
                )}
            </div>

            {/* 상품 정보 */}
            <div className="mb-1.5 grid grid-cols-[auto_1fr] gap-3">
                <div className="bg-gray-regular relative aspect-square h-auto w-[clamp(70px,20vw,100px)]">
                    <Image
                        src={product.imageUrl}
                        alt={product.objectName}
                        fill
                        className="h-auto w-auto object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="text-caption-01 mb-0.5 font-semibold">
                        {product.objectName}
                    </div>
                    <div className="text-caption-01 text-gray-regular mb-2 line-clamp-2">
                        {product.intro}
                    </div>
                    <div className="text-body-03 font-semibold">
                        {formatPrice(product.objectPrice)}원
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            {'button' in currentDeliveryState && (
                <div className="space-y-1.5">
                    {(currentDeliveryState.button as string) && (
                        <button className={clsx('w-full', buttonClass)}>
                            {currentDeliveryState.button as string}
                        </button>
                    )}

                    {(currentDeliveryState.label === 'DELIVERED' ||
                        currentDeliveryState.label ===
                            'PURCHASE_CONFIRMED') && (
                        <div className="flex gap-1.5">
                            <button className={buttonClass}>배송 조회</button>
                            <button className={buttonClass}>
                                반품/환불 요청
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
