'use client';

import { useEffect, useState } from 'react';

import Radio from '@/components/common/Radio';
import CustomInput from '@/components/features/mypage/edit/CustomInput';
import Header from '@/components/layouts/Header';
import { GENDERS } from '@/constants/user';
import { useUpdateUserInfoMutation } from '@/hooks/mutations/useUserMutation';
import { useUserInfoQuery } from '@/hooks/queries/useUserQuery';
import { GenderType } from '@/schemas/user';

export default function Page() {
    const { data: userInfo, isLoading } = useUserInfoQuery();
    const updateUserInfoMutation = useUpdateUserInfoMutation();

    const [newUserInfo, setNewUserInfo] = useState<{
        nickName: string;
        birthDate: string;
        gender: GenderType;
    }>({ nickName: '', birthDate: '', gender: 'UNKNOWN' });
    const [birthDateError, setBirthDateError] = useState('');

    useEffect(() => {
        if (userInfo) {
            setNewUserInfo((prev) => ({
                ...prev,
                nickName: userInfo.nickName,
            }));
        }
    }, [userInfo]);

    if (isLoading) return <div>Loading...</div>;
    else if (!userInfo) return <div>회원 정보를 불러오는 데 실패했습니다.</div>;

    const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDateError('');
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 4) {
            value = value.slice(0, 4) + '-' + value.slice(4);
        }
        if (value.length > 7) {
            value = value.slice(0, 7) + '-' + value.slice(7, 9);
        }

        if (
            value.length > 10 &&
            value.length > newUserInfo.birthDate.length &&
            !birthDateError
        ) {
            return;
        }

        setNewUserInfo({
            ...newUserInfo,
            birthDate: value,
        });

        if (value.length >= 10) {
            const [year, month, day] = value.split('-').map(Number);
            if (year == null || month == null || day == null) return;

            if (year < 1900 || year > 2100) {
                setBirthDateError('연도는 1900년에서 2100년 사이여야 합니다.');
            } else if (month < 1 || month > 12) {
                setBirthDateError('월은 1월에서 12월 사이여야 합니다.');
            } else if (day < 1 || day > 31) {
                setBirthDateError('일은 1일에서 31일 사이여야 합니다.');
            }
        }
    };

    const handleEditButtonClick = async () => {
        if (birthDateError) {
            alert('생년월일 형식이 올바르지 않습니다.');
            return;
        }
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
                        onChange={handleBirthDateChange}
                        placeholder="YYYY-MM-DD"
                    />
                    {birthDateError && (
                        <p className="text-status-red text-body-03">
                            {birthDateError}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="text-body-02">성별</div>
                    <div className="flex gap-6">
                        {GENDERS.map((gender) => (
                            <label
                                key={gender.label}
                                className="flex items-center gap-2"
                            >
                                <Radio
                                    name="gander"
                                    checked={
                                        newUserInfo.gender === gender.label
                                    }
                                    onChange={() =>
                                        setNewUserInfo({
                                            ...newUserInfo,
                                            gender: gender.label,
                                        })
                                    }
                                />
                                <span className="text-body-03 cursor-pointer font-normal">
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
