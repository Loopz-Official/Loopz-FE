import { MinusIcon, PlusIcon } from '@/icons/ObjectDetail';
import { usePurchaseCountStore } from '@/stores/usePurchaseCount';

const OrderQuantity = ({ stock }: { stock: number }) => {
    const { count, increaseCount, decreaseCount } = usePurchaseCountStore();

    const isMinusDisabled = count <= 1;
    const isPlusDisabled = stock === 0 || count >= stock;

    return (
        <div className="border-gray-light flex items-center gap-2.5 rounded-sm border border-solid px-1 py-1.5">
            <button
                onClick={decreaseCount}
                className="flex items-center justify-center p-1.5"
                disabled={isMinusDisabled}
            >
                <MinusIcon color={isMinusDisabled ? '#CCCCCC' : '#151515'} />
            </button>
            <span className="text-body-01 w-6 text-center">
                {stock === 0 ? '품절' : count}
            </span>
            <button
                onClick={() => increaseCount(stock)}
                className="flex items-center justify-center p-1.5"
                disabled={isPlusDisabled}
            >
                <PlusIcon color={isPlusDisabled ? '#CCCCCC' : '#151515'} />
            </button>
        </div>
    );
};

export default OrderQuantity;
