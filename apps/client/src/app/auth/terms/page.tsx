'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { setAuthCookies } from '@/auth/cookie/setCookie';
import BottomFixedButton from '@/components/common/Button/BottomFixed';
import AgreementUnit from '@/components/features/auth/AgreementUnit';
import { SIGN_UP_TERMS } from '@/constants/terms';
import { useUserInfoStore } from '@/hooks/stores/useUserInfoStore';
import { TermsAgreement } from '@/schemas/auth';
import { agreeSignupTerms } from '@/services/api/auth';

export default function TermsPage() {
    const router = useRouter();

    const [agreements, setAgreements] = useState(
        SIGN_UP_TERMS.map((a) => ({ ...a }))
    );

    const isCheckedAll = agreements.every((agreement) => agreement.checked);
    const isMandatoryAllChecked = agreements
        .filter((agreement) => agreement.mandatory)
        .every((agreement) => agreement.checked);

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

    const handleTermsAgreementSubmit = async () => {
        const termsAgreement = agreements.reduce(
            (acc, cur) => ({
                ...acc,
                [cur.id]: cur.checked,
            }),
            {} as TermsAgreement
        );

        // // console.log('termsAgreement: ', termsAgreement);

        const termsResponse = await agreeSignupTerms(termsAgreement);
        if (!termsResponse) return;

        const { data: termsUserInfo, status } = termsResponse;

        if (status === 200) {
            useUserInfoStore.getState().setUserInfo(termsUserInfo);
            setAuthCookies({
                enabled: termsUserInfo.enabled,
            });

            router.push('/auth/complete');
        }
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
                        key={agreement.id}
                        index={i}
                        {...agreement}
                        checked={agreement.checked}
                        onChange={(checked) => handleSingleChange(i, checked)}
                    />
                ))}
            </section>
            <BottomFixedButton
                position="static"
                text="다음"
                isDisabled={!isMandatoryAllChecked}
                onClick={handleTermsAgreementSubmit}
            />
        </>
    );
}
