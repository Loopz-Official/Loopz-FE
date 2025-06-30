'use client';

import SectionTitle from './SectionTitle';

interface NameSectionProps {
    value: string;
    onChange: (value: string) => void;
}

export default function NameSection({ value, onChange }: NameSectionProps) {
    return (
        <>
            <SectionTitle>받으시는 분</SectionTitle>

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="이름을 입력해 주세요."
                className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
            />
        </>
    );
}
