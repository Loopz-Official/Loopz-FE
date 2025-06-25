'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import AgreementUnit from '@/components/features/auth/AgreementUnit';
import { SIGN_UP_AGREEMENTS } from '@/constants/agreements';

export default function TermsPage() {
    const router = useRouter();

    const [agreements, setAgreements] = useState(
        SIGN_UP_AGREEMENTS.map((a) => ({ ...a }))
    );

    const isCheckedAll = agreements.every((agreement) => agreement.checked);

    const handleAllChange = (checked: boolean) => {
        setAgreements(
            agreements.map((agreement) => ({ ...agreement, checked }))
        );
    };

    const handleSingleChange = (index: number, checked: boolean) => {
        setAgreements((agreements) =>
            agreements.map((agreement, i) =>
                i === index ? { ...agreement, checked } : agreement
            )
        );
    };

    return (
        <>
            <section>
                <h2 className="text-headline-03 mb-6">약관동의</h2>
                <AgreementUnit
                    type="all"
                    title="전체 동의하기 (선택 동의 포함)"
                    checked={isCheckedAll}
                    onChange={handleAllChange}
                />
                {agreements.map((agreement, i) => (
                    <AgreementUnit
                        type="single"
                        key={agreement.title}
                        index={i}
                        {...agreement}
                        checked={agreement.checked}
                        onChange={(checked) => handleSingleChange(i, checked)}
                    />
                ))}
            </section>
            <BottomButton
                position="static"
                text="다음"
                isDisabled={!isCheckedAll}
                onClick={() => router.push('/auth/complete')}
            />
        </>
    );
}
