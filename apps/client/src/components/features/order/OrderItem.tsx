import clsx from 'clsx';
import Image from 'next/image';

import { OrderItemVariant } from '@/constants/order';
import { ObjectInfo } from '@/schemas/object';
import { OrderedObjectInfo } from '@/schemas/order';
import { formatPrice } from '@/utils/formatPrice';

type OrderItemProps = {
    item: ObjectInfo | OrderedObjectInfo;
    variant: OrderItemVariant;
};

export default function OrderItem({ item, variant }: OrderItemProps) {
    const titleClassName =
        variant === 'complete' ? 'text-body-03' : 'text-body-01 font-semibold';

    return (
        <div className="grid grid-cols-[1fr_auto] justify-between">
            <div className="w-full min-w-0 pr-2">
                <h3 className={clsx('w-full truncate', titleClassName)}>
                    {'objectName' in item && item.objectName}
                </h3>
                <span className="text-caption-01 text-gray-dark tracking-normal">
                    {'objectPrice' in item && formatPrice(item.objectPrice)}원 /
                    수량 {item.quantity}개
                </span>
            </div>
            <div className="bg-gray-regular relative aspect-square h-auto w-[clamp(70px,20vw,100px)]">
                <Image
                    src={'imageUrl' in item ? item.imageUrl : '/no-image.png'}
                    alt={'objectName' in item ? item.objectName : 'no-image'}
                    fill
                    className="h-auto w-auto object-cover"
                />
            </div>
        </div>
    );
}
