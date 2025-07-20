import Link from 'next/link';

import { formatDate } from '@/utils/formatDate';

type OrderHeaderProps = {
    orderNumber: string;
    orderDate: string;
};

const OrderHeader = ({ orderNumber, orderDate }: OrderHeaderProps) => {
    return (
        <div className="flex w-full items-center justify-between">
            <h4 className="text-headline-04">{formatDate(orderDate)}</h4>
            <Link
                href={`/my-order/${orderNumber}`}
                className="text-caption-02 text-gray-04 border-gray-04 border-b py-0.5 text-center font-medium"
            >
                주문 상세
            </Link>
        </div>
    );
};

export default OrderHeader;
