import Radio from '@/components/common/Radio';

export default function RadioSection({ options }: { options: string[] }) {
    return (
        <div>
            <div className="space-y-5">
                {options.map((reason) => (
                    <label
                        key={reason}
                        className="text-body-02 text-gray-dark flex items-center gap-2 font-normal"
                    >
                        <Radio
                            name="return"
                            checked={false}
                            onChange={() => {}}
                        />
                        {reason}
                    </label>
                ))}
            </div>

            {/* TODO: 기타 선택 시에만 나타나도록 수정 필요 */}
            <div className="pl-8">
                <textarea
                    placeholder="30자 이내로 내용을 입력해주세요."
                    maxLength={30}
                    className="h-23 border-gray-regular text-body-03 text-disabled mt-1.5 w-full resize-none rounded-sm border p-2.5 font-normal"
                />
            </div>
        </div>
    );
}
