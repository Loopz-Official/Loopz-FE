import { PAYMENT_METHOD_LABEL_MAP } from '@/constants/order';
import { PaymentMethodEnum } from '@/schemas/order';
import { formatPrice } from '@/utils/formatPrice';

import DetailTitle from '../detail/DetailTitle';

export default function OrderPaymentSummary({
    totalProductPrice,
    shippingFee,
    totalPayment,
    paymentMethod,
}: {
    totalProductPrice: number;
    shippingFee: number;
    totalPayment: number;
    paymentMethod: PaymentMethodEnum;
}) {
    const summaries = [
        { label: '상품 금액', value: `${formatPrice(totalProductPrice)}원` },
        { label: '배송비', value: `${formatPrice(shippingFee)}원` },
        { label: '총 결제 금액', value: `${formatPrice(totalPayment)}원` },
        { label: '결제 수단', value: PAYMENT_METHOD_LABEL_MAP[paymentMethod] },
    ];

    return (
        <div>
            <DetailTitle>결제 내역</DetailTitle>

            <div className="flex flex-col gap-2">
                {summaries.map((summary) =>
                    summary.label === '총 결제 금액' ? (
                        <div
                            key={summary.label}
                            className="border-gray-light text-body-01 mt-2 flex items-center justify-between border-t pt-3"
                        >
                            <div>{summary.label}</div>
                            <div className="text-point font-semibold">
                                {summary.value}
                            </div>
                        </div>
                    ) : (
                        <div
                            key={summary.label}
                            className="text-body-03 flex items-center justify-between font-normal"
                        >
                            <div className="text-gray-dark">
                                {summary.label}
                            </div>
                            <div>{summary.value}</div>
                        </div>
                    )
                )}
            </div>

            <div className=""></div>
        </div>
    );
}
