import Radio from '@/components/common/Radio';

export const returnReasons = [
    '상품이 설명과 다름',
    '배송 지연 또는 미도착',
    '주문 실수 또는 중복 결제',
    '상품 불량 또는 파손',
    '기타',
];

export default function RadioSection() {
    return (
        <div>
            <div className="space-y-5">
                {returnReasons.map((reason) => (
                    <label
                        key={reason}
                        className="text-body-02 text-gray-dark flex items-center gap-2 font-normal"
                    >
                        <Radio name="return" />
                        {reason}
                    </label>
                ))}
            </div>

            {/* TODO: 기타 선택 시에만 나타나도록 수정 필요 */}
            <textarea
                placeholder="30자 이내로 내용을 입력해주세요."
                maxLength={30}
                className="h-23 border-gray-regular text-body-03 text-disabled ml-3 mt-1.5 w-[90%] resize-none rounded-sm border p-2.5 font-normal"
            />
        </div>
    );
}
