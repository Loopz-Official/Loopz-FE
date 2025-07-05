import { useMemo, useState } from 'react';

import { Term } from '@/schemas/terms';

// 약관 체크 훅 반환값 타입
export interface TermsCheckReturn {
    checkedTerms: string[];
    isChecked: (id: string) => boolean;
    isAllMandatoryChecked: boolean;
    isAllChecked: boolean;
    toggle: (id: string) => void;
    toggleAll: () => void;
    toggleMandatoryOnly: () => void;
    mandatoryTerms: Term[];
    optionalTerms: Term[];
}

// 약관 체크에 특화된 훅
export function useTermsCheck(terms: Term[]): TermsCheckReturn {
    const mandatoryTerms = useMemo(
        () => terms.filter((term) => term.mandatory),
        [terms]
    );
    const optionalTerms = useMemo(
        () => terms.filter((term) => !term.mandatory),
        [terms]
    );

    const [checkedTerms, setCheckedTerms] = useState<string[]>([]);

    const isChecked = useMemo(
        () => (id: string) => checkedTerms.includes(id),
        [checkedTerms]
    );

    const isAllMandatoryChecked = useMemo(
        () =>
            mandatoryTerms.length > 0 &&
            mandatoryTerms.every((term) => isChecked(term.id)),
        [mandatoryTerms, isChecked]
    );

    const isAllChecked = useMemo(
        () => terms.length > 0 && terms.every((term) => isChecked(term.id)),
        [terms, isChecked]
    );

    const toggle = useMemo(
        () => (id: string) => {
            setCheckedTerms((prev) =>
                prev.includes(id)
                    ? prev.filter((termId) => termId !== id)
                    : [...prev, id]
            );
        },
        []
    );

    const toggleAll = useMemo(
        () => () => {
            setCheckedTerms(isAllChecked ? [] : terms.map((term) => term.id));
        },
        [isAllChecked, terms]
    );

    const toggleMandatoryOnly = useMemo(
        () => () => {
            const mandatoryIds = mandatoryTerms.map((term) => term.id);
            const allMandatoryChecked = mandatoryIds.every((id) =>
                isChecked(id)
            );

            if (allMandatoryChecked) {
                // 모든 필수 약관이 체크되어 있으면 필수 약관만 해제
                setCheckedTerms((prev) =>
                    prev.filter((id) => !mandatoryIds.includes(id))
                );
            } else {
                // 필수 약관이 하나라도 해제되어 있으면 모든 필수 약관 체크
                setCheckedTerms((prev) => {
                    const newChecked = [...prev];
                    mandatoryIds.forEach((id) => {
                        if (!newChecked.includes(id)) {
                            newChecked.push(id);
                        }
                    });
                    return newChecked;
                });
            }
        },
        [mandatoryTerms, isChecked]
    );

    return useMemo(
        () => ({
            checkedTerms,
            isChecked,
            isAllMandatoryChecked,
            isAllChecked,
            toggle,
            toggleAll,
            toggleMandatoryOnly,
            mandatoryTerms,
            optionalTerms,
        }),
        [
            checkedTerms,
            isChecked,
            isAllMandatoryChecked,
            isAllChecked,
            toggle,
            toggleAll,
            toggleMandatoryOnly,
            mandatoryTerms,
            optionalTerms,
        ]
    );
}
