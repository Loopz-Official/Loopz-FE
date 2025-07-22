'use client';

import { useRouter } from 'next/navigation';

import { setAuthCookies } from '@/auth/cookie/setCookie';
import BottomFixedButton from '@/components/common/Button/BottomFixed';
import AgreementUnit from '@/components/features/auth/AgreementUnit';
import { SIGN_UP_TERMS } from '@/constants/terms';
import { useTermsCheck } from '@/hooks/check/useTermsCheck';
import { useUserInfoStore } from '@/hooks/stores/useUserInfoStore';
import { TermsAgreement } from '@/schemas/auth';
import { agreeSignupTerms } from '@/services/api/auth';

export default function TermsPage() {
    const router = useRouter();
    const terms = SIGN_UP_TERMS;
    const {
        isChecked,
        isAllChecked,
        isAllMandatoryChecked,
        toggle,
        toggleAll,
    } = useTermsCheck(terms);

    const handleTermsAgreementSubmit = async () => {
        const termsAgreement = terms.reduce(
            (acc, cur) => ({
                ...acc,
                [cur.id]: isChecked(cur.id),
            }),
            {} as TermsAgreement
        );

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
                    checked={isAllChecked}
                    onChange={toggleAll}
                />
                {terms.map((term, i) => (
                    <AgreementUnit
                        type="single"
                        key={term.id}
                        index={i}
                        {...term}
                        checked={isChecked(term.id)}
                        onChange={() => toggle(term.id)}
                    />
                ))}
            </section>
            <BottomFixedButton
                position="static"
                text="다음"
                isDisabled={!isAllMandatoryChecked}
                onClick={handleTermsAgreementSubmit}
            />
        </>
    );
}
