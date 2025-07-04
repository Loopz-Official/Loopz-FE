import clsx from 'clsx';

import { usePurchaseCountStore } from '@/hooks/stores/usePurchaseCount';
import { MinusIcon, PlusIcon } from '@/icons/ObjectDetail';

interface OrderQuantityProps {
    type: 'bottomSheet' | 'cart';
    stock: number;
    count?: number;
    onIncrease?: () => void;
    onDecrease?: () => void;
}

const OrderQuantity = ({
    type,
    stock,
    count: propCount,
    onIncrease,
    onDecrease,
}: OrderQuantityProps) => {
    // 전역 상태
    const {
        count: storeCount,
        increaseCount,
        decreaseCount,
    } = usePurchaseCountStore();

    // count와 핸들러를 prop에서 우선 사용, 없으면 전역 상태 사용
    const count = propCount !== undefined ? propCount : storeCount;
    const handleIncrease = onIncrease ? onIncrease : () => increaseCount(stock);
    const handleDecrease = onDecrease ? onDecrease : decreaseCount;

    const isMinusDisabled = count <= 1;
    const isPlusDisabled = stock === 0 || count >= stock;

    return (
        <div
            className={clsx(
                'border-gray-light flex w-fit items-center rounded-sm border border-solid px-1 py-1.5',
                type === 'bottomSheet' ? 'gap-2.5' : 'gap-1'
            )}
        >
            <button
                onClick={handleDecrease}
                className="flex items-center justify-center p-1.5"
                disabled={isMinusDisabled}
            >
                <MinusIcon color={isMinusDisabled ? '#CCCCCC' : '#151515'} />
            </button>
            <span
                className={clsx(
                    'w-6 text-center',
                    type === 'bottomSheet' ? 'text-body-01' : 'text-body-03'
                )}
            >
                {stock === 0 ? '품절' : count}
            </span>
            <button
                onClick={handleIncrease}
                className="flex items-center justify-center p-1.5"
                disabled={isPlusDisabled}
            >
                <PlusIcon color={isPlusDisabled ? '#CCCCCC' : '#151515'} />
            </button>
        </div>
    );
};

export default OrderQuantity;
