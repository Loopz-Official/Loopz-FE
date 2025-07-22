import clsx from 'clsx';

import { ORDER_STATUS_META_MAP } from '@/constants/order';
import { OrderStatusEnum } from '@/schemas/order/enum';

const OrderStatusText = ({ status }: { status: OrderStatusEnum }) => {
    const { label, textColor } = ORDER_STATUS_META_MAP[status];

    return (
        <span
            className={clsx('text-body-03 mb-2 inline-block w-full', textColor)}
        >
            {label}
        </span>
    );
};

export default OrderStatusText;
