'use client';

import clsx from 'clsx';

import CustomInput from '@/components/features/mypage/edit/CustomInput';

interface NicknameSectionProps {
    nickName: string;
    isNicknameValid: boolean | null;
    onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NicknameSection({
    nickName,
    isNicknameValid,
    onNicknameChange,
}: NicknameSectionProps) {
    return (
        <div className="space-y-2">
            <div className="text-body-02">닉네임 *</div>
            <CustomInput
                value={nickName}
                onChange={onNicknameChange}
                placeholder="닉네임을 입력해 주세요."
            />
            {(nickName.length === 0 || isNicknameValid != null) && (
                <p
                    className={clsx(
                        'text-body-03',
                        isNicknameValid && nickName.length > 0
                            ? 'text-status-blue'
                            : 'text-status-red'
                    )}
                >
                    {nickName.length === 0
                        ? '닉네임은 필수 입력 사항입니다.'
                        : isNicknameValid
                          ? '사용 가능한 닉네임입니다.'
                          : '이미 사용 중인 닉네임입니다.'}
                </p>
            )}
        </div>
    );
}
