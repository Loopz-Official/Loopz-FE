import clsx from 'clsx';

import { CART_SUMMARY_LABELS } from '@/constants/cartSummary';
import { formatPrice } from '@/utils/formatPrice';

interface CartSummaryRowProps {
    label: string;
    value: string;
    valueClassName?: string;
    strong?: boolean;
}

interface CartSummaryProps {
    itemCount?: number;
    totalPrice?: number;
    deliveryFee?: number;
    finalPrice?: number;
}

const CartSummaryRow = ({
    label,
    value,
    valueClassName = '',
    strong = false,
}: CartSummaryRowProps) => (
    <div
        className={clsx(
            'text-gray-dark text-body-03 flex items-center justify-between',
            strong && 'text-body-01 mt-0.5 font-semibold'
        )}
    >
        <span className={clsx(strong ? 'font-semibold' : 'font-normal')}>
            {label}
        </span>
        <span
            className={clsx(
                strong ? 'text-point' : 'font-semibold',
                valueClassName
            )}
        >
            {value}
        </span>
    </div>
);

const CartSummary = ({
    itemCount,
    totalPrice,
    deliveryFee,
    finalPrice,
}: CartSummaryProps) => {
    return (
        <div className="flex flex-col gap-2">
            <CartSummaryRow
                label={CART_SUMMARY_LABELS.ITEM_COUNT}
                value={`총 ${itemCount}개`}
            />
            <CartSummaryRow
                label={CART_SUMMARY_LABELS.TOTAL_PRICE}
                value={`${formatPrice(totalPrice)}원`}
            />
            <CartSummaryRow
                label={CART_SUMMARY_LABELS.DELIVERY_FEE}
                value={`${formatPrice(deliveryFee)}원`}
            />
            <CartSummaryRow
                label={CART_SUMMARY_LABELS.FINAL_PRICE}
                value={`${formatPrice(finalPrice)}원`}
                strong
            />
        </div>
    );
};

export default CartSummary;
