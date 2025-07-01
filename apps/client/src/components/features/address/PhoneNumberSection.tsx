'use client';

import { useEffect, useRef, useState } from 'react';

import SectionTitle from './SectionTitle';

interface PhoneNumberSectionProps {
    value: string;
    onChange: (value: string) => void;
}

export default function PhoneNumberSection({
    value,
    onChange,
}: PhoneNumberSectionProps) {
    const maxLengths = [3, 4, 4];
    const phoneInputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [phoneNumberArray, setPhoneNumberArray] = useState<string[]>([
        '',
        '',
        '',
    ]);

    // value가 외부에서 바뀌었고, phoneNumberArray와 다를 때만 동기화
    useEffect(() => {
        if (
            value &&
            value.split('-').length === 3 &&
            value !== phoneNumberArray.join('-')
        ) {
            setPhoneNumberArray(value.split('-'));
        }

        if (!value && phoneNumberArray.some((v) => v !== '')) {
            setPhoneNumberArray(['', '', '']);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // 배열을 XXX-XXXX-XXXX 형식으로 변환 (사용자 입력 시에만 onChange 호출)
    const handlePhoneNumberChange = (index: number, inputValue: string) => {
        // 숫자가 아닌 문자가 포함되어 있으면 리턴
        if (!/^\d*$/.test(inputValue)) return;

        const newPhoneNumber = [...phoneNumberArray];
        newPhoneNumber[index] = inputValue;
        setPhoneNumberArray(newPhoneNumber);

        // 현재 입력이 maxLength에 도달하면 다음 input으로 focus
        if (inputValue.length === maxLengths[index] && index < 2) {
            phoneInputRefs[index + 1]?.current?.focus();
        }

        // 사용자가 입력할 때만 onChange 호출
        const formattedNumber = newPhoneNumber.join('-');
        if (formattedNumber !== value) {
            onChange(formattedNumber);
        }
    };

    const handleKeydown = (index: number, e: React.KeyboardEvent) => {
        if (!phoneNumberArray[index] && e.key === 'Backspace') {
            e.preventDefault();
            phoneInputRefs[index - 1]?.current?.focus();
        }
    };

    return (
        <>
            <SectionTitle>연락처</SectionTitle>

            <div className="grid grid-cols-3 gap-1.5">
                {maxLengths.map((maxLength, index) => (
                    <input
                        key={index}
                        ref={phoneInputRefs[index]}
                        maxLength={maxLength}
                        value={phoneNumberArray[index]}
                        onKeyDown={(e) => handleKeydown(index, e)}
                        onChange={(e) =>
                            handlePhoneNumberChange(index, e.target.value)
                        }
                        className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                    />
                ))}
            </div>
        </>
    );
}
