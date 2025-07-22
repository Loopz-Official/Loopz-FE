'use client';

import { useRouter } from 'next/navigation';

import { setAuthCookies } from '@/auth/cookie/setCookie';
import BottomFixedButton from '@/components/common/Button/BottomFixed';
import AgreementUnit from '@/components/features/auth/AgreementUnit';
import { SIGN_UP_TERMS } from '@/constants/terms';
import { useTermsCheck } from '@/hooks/check/useTermsCheck';
import { useUserEmailStore } from '@/hooks/stores/useUserEmailStore';
import { ChevronRightIcon } from '@/icons/Chevron';
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
            setAuthCookies({
                enabled: termsUserInfo.enabled,
            });
            // 로그인 성공 시 불필요한 이메일 정보 스토리지 내 제거
            useUserEmailStore.getState().clearUserEmail();
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
                {terms.map((term, i) => {
                    const isFirstOrLast = i === 0 || i === terms.length - 1;

                    return (
                        <div
                            key={term.id}
                            className="flex items-center justify-between pr-3"
                        >
                            <AgreementUnit
                                type="single"
                                index={i}
                                {...term}
                                checked={isChecked(term.id)}
                                onChange={() => toggle(term.id)}
                            />
                            {!isFirstOrLast && (
                                <a
                                    href={term.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-6 w-6 items-center justify-between"
                                >
                                    <ChevronRightIcon />
                                </a>
                            )}
                        </div>
                    );
                })}
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
