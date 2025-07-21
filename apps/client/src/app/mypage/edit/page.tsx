'use client';

import { useEffect, useState } from 'react';

import Radio from '@/components/common/Radio';
import Header from '@/components/layouts/Header';
import { useUpdateUserInfoMutation } from '@/hooks/mutations/useUserMutation';
import { useUserInfoQuery } from '@/hooks/queries/useUserQuery';
import { DetailAccountInfo } from '@/schemas/user';

export const GENDERS = [
    {
        label: 'MALE',
        value: '남성',
        checked: false,
    },
    {
        label: 'FEMAIL',
        value: '여성',
        checked: false,
    },
    {
        label: 'UNKNOWN',
        value: '선택하지 않음',
        checked: false,
    },
] as const;

export function CustomInput({
    readOnly = false,
    placeholder,
    value,
    onChange,
}: {
    readOnly?: boolean;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <input
            onChange={onChange}
            type="text"
            readOnly={readOnly}
            value={value}
            placeholder={placeholder}
            className="text-body-01 placeholder:text-disabled read-only:text-disabled border-gray-regular w-full rounded-sm border px-3 py-4 font-normal read-only:border-[#f7f7f7] read-only:bg-[#f7f7f7]"
        />
    );
}

export default function Page() {
    const { data: userInfo, isLoading } = useUserInfoQuery();
    const updateUserInfoMutation = useUpdateUserInfoMutation();

    const [newUserInfo, setNewUserInfo] = useState<
        Pick<DetailAccountInfo, 'nickName' | 'birthDate' | 'gender'>
    >({ nickName: '', birthDate: '', gender: 'UNKNOWN' });

    useEffect(() => {
        if (userInfo) {
            setNewUserInfo({ ...userInfo, nickName: userInfo.nickName });
        }
    }, [userInfo]);

    if (isLoading) return <div>Loading...</div>;
    else if (!userInfo) return <div>회원 정보를 불러오는 데 실패했습니다.</div>;

    const handleEditButtonClick = async () => {
        try {
            await updateUserInfoMutation.mutateAsync({
                nickName: newUserInfo.nickName,
                birthDate: newUserInfo.birthDate,
                gender: newUserInfo.gender,
            });
        } catch {
            alert('회원 정보를 수정하는 중 에러가 발생했습니다.');
        }
    };

    return (
        <div>
            <Header type="title" title="확인/수정하기" />

            <div className="space-y-9 px-5 py-6">
                <div className="space-y-2">
                    <div className="text-body-02">닉네임 *</div>
                    <CustomInput
                        value={newUserInfo.nickName}
                        onChange={(e) =>
                            setNewUserInfo({
                                ...newUserInfo,
                                nickName: e.target.value,
                            })
                        }
                        placeholder="닉네임을 입력해 주세요."
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-body-02">이메일 (변경 불가)</div>
                    <CustomInput
                        readOnly
                        value={userInfo.email ?? ''}
                        placeholder="이메일을 입력해 주세요."
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-body-02">생년월일</div>
                    <CustomInput
                        value={newUserInfo.birthDate ?? ''}
                        onChange={(e) =>
                            setNewUserInfo({
                                ...newUserInfo,
                                birthDate: e.target.value,
                            })
                        }
                        placeholder="YYYY-MM-DD"
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-body-02">성별</div>
                    <div className="flex gap-6">
                        {GENDERS.map((gender) => (
                            <label
                                key={gender.label}
                                className="flex items-center gap-2"
                                onClick={() =>
                                    setNewUserInfo({
                                        ...newUserInfo,
                                        gender: gender.label,
                                    })
                                }
                            >
                                <Radio name="gander" />
                                <span className="text-body-03 font-normal">
                                    {gender.value}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 w-full max-w-2xl px-5 py-8">
                <button
                    onClick={handleEditButtonClick}
                    className="disabled:bg-button-disabled text-body-02 w-full rounded-sm bg-black py-4 text-white"
                >
                    수정하기
                </button>
            </div>
        </div>
    );
}
