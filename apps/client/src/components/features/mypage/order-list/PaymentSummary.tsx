import { formatPrice } from '@/utils/formatPrice';

import DetailTitle from '../order-return-list/DetailTitle';

export default function PaymentSummary() {
    const summaries = [
        { label: '상품 금액', value: 52900 },
        { label: '배송비', value: 3000 },
    ];

    return (
        <div className="mx-5">
            <DetailTitle>결제 내역</DetailTitle>

            <div className="flex flex-col gap-2">
                {summaries.map((summary) => (
                    <div
                        key={summary.label}
                        className="text-body-03 flex items-center justify-between font-normal"
                    >
                        <div className="text-gray-dark">{summary.label}</div>
                        <div>{formatPrice(summary.value)}원</div>
                    </div>
                ))}
            </div>

            <div className=""></div>
        </div>
    );
}
