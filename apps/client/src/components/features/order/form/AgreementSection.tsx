'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Agreement, INITIAL_AGREEMENTS } from '@/constants/agreements';

export default function AgreementSection() {
    const [agreements, setAgreements] =
        useState<Agreement[]>(INITIAL_AGREEMENTS);
    const isAllChecked = agreements.every((agreement) => agreement.checked);

    const handleAllCheckChange = () => {
        const updatedChecked = !isAllChecked;
        setAgreements(
            agreements.map((agreement) => ({
                ...agreement,
                checked: updatedChecked,
            }))
        );
    };

    const handleSingleCheckChange = (index: number) => {
        setAgreements(
            agreements.map((agreement, i) =>
                i === index
                    ? { ...agreement, checked: !agreement.checked }
                    : agreement
            )
        );
    };

    return (
        <>
            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleAllCheckChange}
                    className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-4 w-4 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
                />
                <span className="text-caption-01 font-semibold">
                    주문 내용을 모두 확인했으며, 아래 내용에 모두 동의합니다.
                </span>
            </label>

            <hr className="border-gray-light mb-3 mt-4" />

            <div className="space-y-1.5 tracking-normal">
                {agreements.map(({ title, href, checked }, index) => (
                    <label key={title} className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleSingleCheckChange(index)}
                            className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-4 w-4 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
                        />
                        <span className="text-caption-01 text-gray-regular">
                            (필수) {title}
                            <Link
                                href={href}
                                className="ml-1.5 underline underline-offset-2"
                            >
                                보기
                            </Link>
                        </span>
                    </label>
                ))}
            </div>
        </>
    );
}
