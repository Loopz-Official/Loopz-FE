'use client';

import Link from 'next/link';

import CheckBox from '@/components/common/CheckBox';
import { TermsCheckReturn } from '@/hooks/check';

interface AgreementSectionProps {
    termsCheck: TermsCheckReturn;
}

export default function AgreementSection({
    termsCheck,
}: AgreementSectionProps) {
    const {
        mandatoryTerms,
        optionalTerms,
        isChecked,
        isAllMandatoryChecked,
        toggle,
        toggleMandatoryOnly,
    } = termsCheck;

    const allTerms = [...mandatoryTerms, ...optionalTerms];

    return (
        <>
            <label className="flex w-fit cursor-pointer items-center gap-3">
                <CheckBox
                    isChecked={isAllMandatoryChecked}
                    onChange={toggleMandatoryOnly}
                />
                <span className="text-caption-01 select-none font-semibold">
                    주문 내용을 모두 확인했으며, 아래 내용에 모두 동의합니다.
                </span>
            </label>

            <hr className="border-gray-light mb-3 mt-4" />

            <div className="space-y-1.5 tracking-normal">
                {allTerms.map(({ id, title, href, mandatory }) => (
                    <label
                        key={id}
                        className="flex w-fit cursor-pointer items-center gap-3"
                    >
                        <CheckBox
                            isChecked={isChecked(id)}
                            onChange={() => toggle(id)}
                        />

                        <span className="text-caption-01 text-gray-regular select-none">
                            {mandatory ? '(필수)' : '(선택)'} {title}
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
