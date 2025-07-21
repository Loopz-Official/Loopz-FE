import Radio from '@/components/common/Radio';
import Header from '@/components/layouts/Header';

export const GENDERS = [
    {
        label: 'MALE',
        value: '남성',
        checked: false,
    },
    {
        label: 'FEMAIL',
        value: '여성',
        checked: false,
    },
    {
        label: 'UNKNOWN',
        value: '선택하지 않음',
        checked: false,
    },
];

export function CustomInput({
    readOnly = false,
    placeholder,
}: {
    readOnly?: boolean;
    placeholder: string;
}) {
    return (
        <input
            readOnly={readOnly}
            type="text"
            placeholder={placeholder}
            className="text-body-01 placeholder:text-disabled border-gray-regular w-full rounded-sm border px-3 py-4 font-normal read-only:border-[#f7f7f7] read-only:bg-[#f7f7f7]"
        />
    );
}

export default function Page() {
    return (
        <div>
            <Header type="title" title="확인/수정하기" />

            <div className="space-y-9 px-5 py-6">
                <div className="space-y-2">
                    <div className="text-body-02">닉네임 *</div>
                    <CustomInput placeholder="닉네임을 입력해 주세요." />
                </div>

                <div className="space-y-2">
                    <div className="text-body-02">이메일 (변경 불가)</div>
                    <CustomInput
                        readOnly
                        placeholder="이메일을 입력해 주세요."
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-body-02">생년월일</div>
                    <CustomInput placeholder="YYYY-MM-DD" />
                </div>

                <div className="space-y-2">
                    <div className="text-body-02">성별</div>
                    <div className="flex gap-6">
                        {GENDERS.map((gender) => (
                            <label
                                key={gender.label}
                                className="flex items-center gap-2"
                            >
                                <Radio name="gander" />
                                <span className="text-body-03 font-normal">
                                    {gender.value}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 w-full max-w-2xl px-5 py-8">
                <button className="disabled:bg-button-disabled text-body-02 w-full rounded-sm bg-black py-4 text-white">
                    수정하기
                </button>
            </div>
        </div>
    );
}
