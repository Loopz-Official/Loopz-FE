'use client';

import { usePathname } from 'next/navigation';

export default function OrderItem() {
    const pathname = usePathname();

    // 주문 완료 페이지에서는 body-03-medium
    // 그 외 body-01-semibold
    const titleClassName = pathname.split('/').includes('complete')
        ? 'text-body-03'
        : 'text-body-01 font-semibold';

    return (
        <div className="flex justify-between">
            <div>
                <h3 className={titleClassName}>빈티지 다이얼 전화기</h3>
                <span className="text-caption-01 text-gray-dark tracking-normal">
                    21,000원 / 수량 1개
                </span>
            </div>
            <div className="bg-gray-regular aspect-square h-auto w-[clamp(70px,20vw,100px)]" />
        </div>
    );
}
