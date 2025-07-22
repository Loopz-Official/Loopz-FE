import RadioButton from '@/components/common/Button/Radio';
import { CLAIM_REASONS, ClaimType } from '@/constants/order';

type Props = {
    claimType: ClaimType;
    selectedValue: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ClaimReasonSelector = ({ claimType, selectedValue, onChange }: Props) => {
    const reasons = CLAIM_REASONS[claimType];

    return (
        <div className="flex flex-col gap-4">
            <section className="space-y-1">
                <p className="text-body-01 font-semibold">
                    취소/반품 사유를 선택해 주세요.
                </p>

                {claimType === 'cancel' && ( // 추후 return 타입일 때로 변경
                    <p className="text-body-03 text-gray-dark font-normal">
                        * 단순 변심으로 인한 요청은 구매 후{' '}
                        <span className="text-point">7일 이내</span>에 가능하며,
                        이외 요청은 환불 규정에 따릅니다.
                    </p>
                )}
            </section>

            <section className="pl-1">
                <div className="space-y-5">
                    {reasons.map((reason) => (
                        <RadioButton
                            key={reason}
                            name={claimType}
                            value={reason}
                            label={reason}
                            onChange={onChange}
                            checked={selectedValue === reason}
                            className="text-body-02 text-gray-dark flex w-fit items-center gap-2 font-normal"
                        />
                    ))}
                </div>

                {selectedValue === '기타' && (
                    <div className="pl-8">
                        <textarea
                            placeholder="30자 이내로 내용을 입력해주세요."
                            maxLength={30}
                            className="border-gray-regular text-body-03 mt-2 h-16 w-full resize-none rounded-sm border p-2.5 font-normal text-black"
                        />
                    </div>
                )}
            </section>
        </div>
    );
};

export default ClaimReasonSelector;
