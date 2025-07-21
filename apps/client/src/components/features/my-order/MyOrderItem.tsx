import Image from 'next/image';

import { useOrderStatusCTAHandlers } from '@/hooks/actions/useOrderStatusCTAHandlers';
import { OrderedObjectDetailInfo } from '@/schemas/order';
import { formatPrice } from '@/utils/formatPrice';
import { getButtonsByStatus } from '@/utils/my-order/getButtonsByStatus';

import ActionButtonList from './ActionButtonList';
import OrderStatusText from './OrderStatusText';

const MyOrderItem = ({
    orderNumber,
    orderedObjects,
}: {
    orderNumber?: string;
    orderedObjects: OrderedObjectDetailInfo[];
}) => {
    const ctaHandlers = useOrderStatusCTAHandlers();

    return (
        <section className="flex flex-col gap-5">
            {orderedObjects.map((object) => (
                <div key={object.objectId}>
                    <OrderStatusText status={object.status} />
                    <div className="flex w-full gap-3">
                        <Image
                            src={object.imageUrl}
                            alt={object.objectName}
                            width={96}
                            height={96}
                            priority
                        />
                        <section className="flex flex-col justify-between">
                            <div className="text-caption-01 flex flex-col gap-0.5">
                                <span className="font-semibold">
                                    {object.objectName}
                                </span>
                                <span className="text-gray-04 inline-block w-full">
                                    {object.intro}
                                </span>
                            </div>
                            <span className="text-body-03 font-semibold">
                                {formatPrice(object.purchasePrice)}원
                            </span>
                        </section>
                    </div>
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
