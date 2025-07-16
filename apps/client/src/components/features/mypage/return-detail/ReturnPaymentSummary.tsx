import clsx from 'clsx';

import { formatPrice } from '@/utils/formatPrice';

import DetailTitle from '../detail/DetailTitle';

export default function ReturnPaymentSummary({
    totalProductPrice,
    shippingFee,
    totalPayment,
}: {
    totalProductPrice: number;
    shippingFee: number;
    totalPayment: number;
}) {
    const summaries = [
        { label: '총 결제 금액', value: `${formatPrice(totalPayment)}원` },
        { label: '상품 금액', value: `${formatPrice(totalProductPrice)}원` },
        { label: '배송비', value: `${formatPrice(shippingFee)}원` },
    ];

    return (
        <div>
            <DetailTitle>결제 내역</DetailTitle>

            <div className="text-body-03 flex flex-col gap-2">
                {summaries.map((summary) => (
                    <div
                        key={summary.label}
                        className={clsx(
                            'flex items-center justify-between',
                            summary.label === '총 결제 금액'
                                ? 'font-semibold'
                                : 'font-normal'
                        )}
                    >
                        <div
                            className={
                                summary.label === '총 결제 금액'
                                    ? ''
                                    : 'text-gray-dark'
                            }
                        >
                            {summary.label}
                        </div>
                        <div>{summary.value}</div>
                    </div>
                ))}
            </div>

            <div className=""></div>
        </div>
    );
}
