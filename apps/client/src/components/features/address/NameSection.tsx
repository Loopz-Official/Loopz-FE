'use client';

import SectionTitle from './SectionTitle';

export default function NameSection({
    name,
    setName,
}: {
    name: string;
    setName: (name: string) => void;
}) {
    return (
        <>
            <SectionTitle>받으시는 분</SectionTitle>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해 주세요."
                className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
            />
        </>
    );
}
