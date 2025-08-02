'use client';

import { useState } from 'react';

import RadioButton from '@/components/common/Button/Radio';
import Header from '@/components/layouts/Header';
import { LEAVE_REASONS } from '@/constants/user';

export default function Page() {
    const [selectedValue, setSelectedValue] = useState<string>(
        LEAVE_REASONS[0] ?? ''
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(e.target.value);
    };

    return (
        <>
            <Header type="title" title="탈퇴하기" />

            <section className="mb-5 px-5 pt-8">
                <div className="text-body-01 font-semibold">
                    (필수) 탈퇴 사유를 선택해 주세요.
                </div>
            </section>

            <section className="px-5">
                <div className="space-y-5">
                    {LEAVE_REASONS.map((reason) => (
                        <RadioButton
                            key={reason}
                            name={'leave'}
                            value={reason}
                            label={reason}
                            onChange={handleChange}
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
        </>
    );
}
