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

    // XXX-XXXX-XXXX 형식을 배열로 변환
    const [phoneNumberArray, setPhoneNumberArray] = useState<string[]>(() => {
        if (!value) return ['', '', ''];
        return value.split('-');
    });

    // 배열을 XXX-XXXX-XXXX 형식으로 변환
    useEffect(() => {
        const formattedNumber = phoneNumberArray.join('-');
        if (formattedNumber !== value) {
            onChange(formattedNumber);
        }
    }, [phoneNumberArray, value, onChange]);

    const handleKeydown = (index: number, e: React.KeyboardEvent) => {
        if (!phoneNumberArray[index] && e.key === 'Backspace') {
            e.preventDefault();
            phoneInputRefs[index - 1]?.current?.focus();
        }
    };

    const handlePhoneNumberChange = (index: number, value: string) => {
        // 숫자가 아닌 문자가 포함되어 있으면 리턴
        if (!/^\d*$/.test(value)) return;

        const newPhoneNumber = [...phoneNumberArray];
        newPhoneNumber[index] = value;
        setPhoneNumberArray(newPhoneNumber);

        // 현재 입력이 maxLength에 도달하면 다음 input으로 focus
        if (value.length === maxLengths[index] && index < 2) {
            phoneInputRefs[index + 1]?.current?.focus();
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
