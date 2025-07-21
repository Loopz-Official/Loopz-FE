import { OrderStatusEnum } from '@/schemas/order';
import { OrderActionButton } from '@/types/myOrder';

import noop from '../noop';

type HandlerFunction = (options: { orderNumber?: string }) => void;

export function getButtonsByStatus(
    status: OrderStatusEnum,
    orderNumber: string,
    handlers: { [key: string]: HandlerFunction }
): OrderActionButton[] {
    const handleClick = (handler: HandlerFunction) => () => {
        handler({ orderNumber });
    };

    switch (status) {
        case 'PENDING':
            return [
                {
                    label: '결제 취소',
                    onClick: handleClick(handlers.cancel ?? noop),
                },
            ];
        case 'ORDERED':
            return [
                {
                    label: '결제 취소',
                    onClick: handleClick(handlers.cancel ?? noop),
                },
            ];
        case 'DELIVERY_READY':
            return [
                {
                    label: '배송 조회',
                    onClick: handleClick(handlers.track ?? noop),
                },
            ];
        case 'SHIPPING':
            return [
                {
                    label: '배송 조회',
                    onClick: handleClick(handlers.track ?? noop),
                },
            ];
        case 'DELIVERED':
            return [
                {
                    label: '배송 조회',
                    onClick: handleClick(handlers.track ?? noop),
                },
                {
                    label: '반품 접수',
                    onClick: handleClick(handlers.return ?? noop),
                },
                {
                    label: '구매 확정',
                    onClick: handleClick(handlers.confirm ?? noop),
                },
            ];
        case 'PURCHASE_CONFIRMED':
            return [
                {
                    label: '배송 조회',
                    onClick: handleClick(handlers.track ?? noop),
                },
                {
                    label: '반품 접수',
                    onClick: handleClick(handlers.return ?? noop),
                },
            ];
        default:
            return [];
    }
}
