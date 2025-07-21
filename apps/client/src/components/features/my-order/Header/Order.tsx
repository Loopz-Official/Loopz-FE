import Link from 'next/link';

import { formatDate } from '@/utils/formatDate';

type OrderHeaderProps = {
    orderNumber: string;
    orderDate: string;
    isCSRequested?: boolean;
};

const OrderHeader = ({
    orderNumber,
    orderDate,
    isCSRequested = false,
}: OrderHeaderProps) => {
    return (
        <div className="flex w-full items-center justify-between">
            <h4 className="text-headline-04">{formatDate(orderDate)}</h4>
            <Link
                href={`/my-order/${orderNumber}`}
                className="text-caption-02 text-gray-04 border-gray-04 border-b py-0.5 text-center font-medium"
            >
                {isCSRequested ? '취소 상세' : '주문 상세'}
            </Link>
        </div>
    );
};

export default OrderHeader;
