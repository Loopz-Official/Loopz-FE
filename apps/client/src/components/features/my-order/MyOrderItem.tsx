import { useOrderStatusCTAHandlers } from '@/hooks/actions/useOrderStatusCTAHandlers';
import { OrderedObjectDetailInfo } from '@/schemas/order';
import { getButtonsByStatus } from '@/utils/my-order/getButtonsByStatus';

import ActionButtonList from './ActionButtonList';
import OrderStatusText from './OrderStatusText';
import OrderedProductCard from './OrderedProductCard';

interface MyOrderItemProps {
    orderNumber?: string;
    orderedObjects: OrderedObjectDetailInfo[];
}

const MyOrderItem = ({ orderNumber, orderedObjects }: MyOrderItemProps) => {
    const ctaHandlers = useOrderStatusCTAHandlers();

    return (
        <section className="flex flex-col gap-5">
            {orderedObjects.map((object) => (
                <div key={object.objectId}>
                    <OrderStatusText status={object.status} />
                    <OrderedProductCard object={object} />
                    {orderNumber && (
                        <ActionButtonList
                            buttons={getButtonsByStatus(
                                object.status,
                                orderNumber,
                                ctaHandlers
                            )}
                        />
                    )}
                </div>
            ))}
        </section>
    );
};

export default MyOrderItem;
