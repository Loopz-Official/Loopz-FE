'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomFixedButton from '@/components/common/Button/BottomFixed';
import CheckBox from '@/components/common/CheckBox';
import { useLeaveReasonStore } from '@/hooks/stores/useLeaveReason';
import { leave } from '@/services/api/auth';

export default function Page() {
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();

    const { reason } = useLeaveReasonStore();

    const handleSubmit = async () => {
        try {
            await leave(reason);
            router.push('/mypage/leave/complete');
        } catch (error) {
            alert((error as Error).message);
        }
    };

    return (
        <>
            <section className="mb-5 space-y-2 px-5 pt-8">
                <h3 className="text-body-01 font-semibold">
                    탈퇴를 진행하시겠습니까?
                </h3>

                <p className="text-body-02 text-gray-dark">
                    탈퇴 시, 스냅 게시물을 제외한 가입된 회원 정보가 모두
                    삭제됩니다.
                </p>
            </section>

            <section className="px-5">
                <label className="flex items-center gap-2">
                    <CheckBox
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="text-body-03 text-gray-dark cursor-pointer font-normal">
                        네! 탈퇴할게요.
                    </span>
                </label>
            </section>

            <BottomFixedButton
                text="완료하기"
                isDisabled={!isChecked}
                onClick={handleSubmit}
            />
        </>
    );
}
