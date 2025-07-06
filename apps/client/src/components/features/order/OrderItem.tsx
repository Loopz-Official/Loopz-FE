'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { Product } from '@/hooks/stores/useSelectedProductsStore';

export type OrderItemProps = {
    variant?: 'default' | 'secondary';
};

export default function OrderItem({
    item,
    variant = 'default',
}: {
    item: Product;
    variant?: 'default' | 'secondary';
}) {
    // 주문 완료 페이지에서는 body-03-medium
    // 그 외 body-01-semibold
    const titleClassName =
        variant === 'secondary' ? 'text-body-03' : 'text-body-01 font-semibold';

    return (
        <div className="grid grid-cols-[1fr_auto] justify-between">
            <div className="w-full min-w-0 pr-2">
                <h3 className={clsx('w-full truncate', titleClassName)}>
                    {item.objectName}
                </h3>
                <span className="text-caption-01 text-gray-dark tracking-normal">
                    {item.objectPrice.toLocaleString()}원 / 수량 {item.quantity}
                    개
                </span>
            </div>
            <div className="bg-gray-regular relative aspect-square h-auto w-[clamp(70px,20vw,100px)]">
                <Image
                    src={item.imageUrl}
                    alt={item.objectName}
                    fill
                    className="h-auto w-auto object-cover"
                />
            </div>
        </div>
    );
}
