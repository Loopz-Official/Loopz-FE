import clsx from 'clsx';

import {
    OrderListDeliveryStates,
    ReturnListDeliveryStates,
} from '@/constants/deliveryState';

// 이 아이템의 state, 추후 api 응답을 props로 전달받음
const currentState = 'DELIVERED';

export default function ProductItemByDeliveryState({
    type,
}: {
    type: 'order' | 'return';
}) {
    const isOrderList = type === 'order';

    const deliveryStates = isOrderList
        ? OrderListDeliveryStates
        : ReturnListDeliveryStates;
    const currentDeliveryState = deliveryStates.find(
        (state) => state.label === currentState
    )!;

    const buttonClass =
        'grow h-10 flex justify-center items-center rounded-md border border-button-gray-regular text-body-03';

    return (
        <div className="px-5">
            <div className="mb-2 flex items-center justify-between">
                <div
                    className={clsx(
                        'text-body-03',
                        isOrderList ? 'text-status-blue' : 'text-gray-regular'
                    )}
                >
                    {currentDeliveryState.value}
                </div>
                <button className="text-caption-02 text-gray-regular underline underline-offset-4">
                    {isOrderList ? '주문 상세' : '취소 상세'}
                </button>
            </div>

            <div></div>

            {'button' in currentDeliveryState && (
                <div className="space-y-1.5">
                    {(currentDeliveryState.button as string) && (
                        <button className={clsx('w-full', buttonClass)}>
                            {currentDeliveryState.button as string}
                        </button>
                    )}

                    <div className="flex gap-1.5">
                        {(currentDeliveryState.label === 'DELIVERED' ||
                            currentDeliveryState.label ===
                                'PURCHASE_CONFIRMED') && (
                            <button className={buttonClass}>배송 조회</button>
                        )}

                        {currentDeliveryState.label === 'DELIVERED' && (
                            <button className={buttonClass}>
                                반품/환불 요청
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
