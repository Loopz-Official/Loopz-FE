import { OrderStatusEnum } from '@/schemas/order';
import { OrderActionButton } from '@/types/myOrder';

import noop from '../noop';

export function getButtonsByStatus(
    status: OrderStatusEnum,
    handlers: { [key: string]: () => void }
): OrderActionButton[] {
    switch (status) {
        case 'PENDING':
            return [{ label: '결제 취소', onClick: handlers.cancel ?? noop }];
        case 'ORDERED':
            return [{ label: '결제 취소', onClick: handlers.cancel ?? noop }];
        case 'DELIVERY_READY':
            return [{ label: '배송 조회', onClick: handlers.track ?? noop }];
        case 'SHIPPING':
            return [{ label: '배송 조회', onClick: handlers.track ?? noop }];
        case 'DELIVERED':
            return [
                { label: '배송 조회', onClick: handlers.track ?? noop },
                { label: '반품 접수', onClick: handlers.return ?? noop },
                { label: '구매 확정', onClick: handlers.confirm ?? noop },
            ];
        case 'PURCHASE_CONFIRMED':
            return [
                { label: '배송 조회', onClick: handlers.track ?? noop },
                { label: '반품 접수', onClick: handlers.return ?? noop },
            ];
        default:
            return [];
    }
}
