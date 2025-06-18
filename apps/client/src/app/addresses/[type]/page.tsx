'use client';

import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import BottomButton from '@/components/features/order/BottomButton';

export default function Page() {
    const [phoneNumber, setPhoneNumber] = useState<string[]>(['', '', '']);
    const [address, setAddress] = useState('');
    const [zonecode, setZonecode] = useState('');
    const maxLengths = [3, 4, 4];

    const params = useParams();
    const type = params.type;

    const phoneInputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleKeydown = (index: number, e: React.KeyboardEvent) => {
        if (!phoneNumber[index] && e.key === 'Backspace') {
            e.preventDefault();
            phoneInputRefs[index - 1]?.current?.focus();
        }
    };

    const handlePhoneNumberChange = (index: number, value: string) => {
        // 숫자가 아닌 문자가 포함되어 있으면 리턴
        if (!/^\d*$/.test(value)) return;

        const newPhoneNumber = [...phoneNumber];
        newPhoneNumber[index] = value;
        setPhoneNumber(newPhoneNumber);

        // 현재 입력이 maxLength에 도달하면 다음 input으로 focus
        if (value.length === maxLengths[index] && index < 2) {
            phoneInputRefs[index + 1]?.current?.focus();
        }
    };

    if (type !== 'add' && type !== 'edit') return;

    const execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                setAddress(data.address);
                setZonecode(data.zonecode);
            },
        }).open();
    };

    return (
        <div>
            {/* 헤더 */}

            <div className="h-[calc(100vh-112px)] px-5 py-3">
                {/* 이름 */}
                <div></div>

                {/* 연락처 */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <div className="space-x-0.5">
                        연락처
                        <span className="text-point text-body-02">*</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                        {maxLengths.map((maxLength, index) => (
                            <input
                                key={index}
                                ref={phoneInputRefs[index]}
                                maxLength={maxLength}
                                value={phoneNumber[index]}
                                onKeyDown={(e) => handleKeydown(index, e)}
                                onChange={(e) =>
                                    handlePhoneNumberChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                            />
                        ))}
                    </div>
                </div>

                {/* 주소 */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <div className="space-x-0.5">
                        주소 <span className="text-point text-body-02">*</span>
                    </div>

                    <div className="flex gap-1.5">
                        <input
                            readOnly
                            value={zonecode}
                            className="border-gray-regular grow rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                        />
                        <button
                            onClick={execDaumPostcode}
                            className="rounded-[0.25rem] border border-black px-4 py-2.5"
                        >
                            우편번호 검색
                        </button>
                    </div>

                    <input
                        readOnly
                        value={address}
                        className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                    />

                    <input
                        placeholder="상세 주소를 입력해 주세요."
                        className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                    />
                </div>
            </div>

            <BottomButton text="저장하기" onClick={() => {}} isDisabled />
        </div>
    );
}
