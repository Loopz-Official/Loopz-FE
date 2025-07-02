'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import CheckBox from '@/components/common/CheckBox';
import { Agreement, INITIAL_AGREEMENTS } from '@/constants/agreements';

export default function AgreementSection({
    setHasAgreedToRequiredTerms,
}: {
    setHasAgreedToRequiredTerms: Dispatch<SetStateAction<boolean>>;
}) {
    const [agreements, setAgreements] =
        useState<Agreement[]>(INITIAL_AGREEMENTS);
    const isAllChecked = agreements.every((agreement) => agreement.checked);

    useEffect(() => {
        setHasAgreedToRequiredTerms(isAllChecked);
    }, [isAllChecked, setHasAgreedToRequiredTerms]);

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
            <label className="flex w-fit cursor-pointer items-center gap-3">
                <CheckBox
                    isChecked={isAllChecked}
                    onChange={handleAllCheckChange}
                />
                <span className="text-caption-01 font-semibold">
                    주문 내용을 모두 확인했으며, 아래 내용에 모두 동의합니다.
                </span>
            </label>

            <hr className="border-gray-light mb-3 mt-4" />

            <div className="space-y-1.5 tracking-normal">
                {agreements.map(({ title, href, checked }, index) => (
                    <label
                        key={title}
                        className="flex w-fit cursor-pointer items-center gap-3"
                    >
                        <CheckBox
                            isChecked={checked}
                            onChange={() => handleSingleCheckChange(index)}
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
