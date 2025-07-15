import DetailTitle from '../order-return-list/DetailTitle';

export default function ReturnDetail() {
    const details = [
        { label: '신청 일시', value: '2025-07-09 17:15:15' },
        { label: '완료 일시', value: '2025-07-09 20:25:15' },
        { label: '취소 사유', value: '상품이 설명과 다름' },
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
        </div>
    );
}
