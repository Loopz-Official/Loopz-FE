import { formatPrice } from '@/utils/formatPrice';

import DetailTitle from '../detail/DetailTitle';

export default function ReturnDetail() {
    const details = [
        { label: '신청 일시', value: '2025-07-09 17:15:15' },
        { label: '완료 일시', value: '2025-07-09 20:25:15' },
        { label: '취소 사유', value: '상품이 설명과 다름' },
    ];

    // TODO: 추후 props로 value 전달
    const refundSummaries = [
        { label: '총 환불 금액', value: `${formatPrice(21000)}원` },
        { label: '환불 수단', value: '계좌이체' },
        { label: '환불 예정일', value: '영업일 기준 3~5일 이내' },
    ];

    return (
        <div>
            <DetailTitle>취소 상세</DetailTitle>

            <div className="flex flex-col gap-2">
                {details.map((detail) => (
                    <div
                        key={detail.label}
                        className="text-body-03 flex gap-[3.125rem] font-normal"
                    >
                        <div className="text-gray-dark">{detail.label}</div>
                        <div>{detail.value}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                {refundSummaries.map((summary) =>
                    summary.label === '총 환불 금액' ? (
                        <div
                            key={summary.label}
                            className="border-gray-light text-body-01 mt-4 flex items-center justify-between border-t pt-3"
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
        </div>
    );
}
