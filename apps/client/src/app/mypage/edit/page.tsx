'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import BirthDateSection from '@/components/features/mypage/edit/BirthDateSection';
import EmailSection from '@/components/features/mypage/edit/EmailSection';
import GenderSection from '@/components/features/mypage/edit/GenderSection';
import NicknameSection from '@/components/features/mypage/edit/NicknameSection';
import Header from '@/components/layouts/Header';
import { useUpdateUserInfoMutation } from '@/hooks/mutations/useUserMutation';
import { useUserInfoQuery } from '@/hooks/queries/useUserQuery';
import { GenderType } from '@/schemas/user';
import { checkNicknameRedundancy } from '@/services/api/auth';
import { validateBirthDate } from '@/utils/mypage/validateBirthDate';

export default function Page() {
    const { data: userInfo, isLoading } = useUserInfoQuery();
    const updateUserInfoMutation = useUpdateUserInfoMutation();

    const [newUserInfo, setNewUserInfo] = useState<{
        nickName: string;
        birthDate: string;
        gender: GenderType;
    }>({ nickName: '', birthDate: '', gender: 'UNKNOWN' });
    const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(
        null
    );
    const [birthDateError, setBirthDateError] = useState('');

    useEffect(() => {
        if (userInfo) {
            setNewUserInfo({
                nickName: userInfo.nickName,
                birthDate: userInfo.birthDate ?? '',
                gender: userInfo.gender ?? 'UNKNOWN',
            });
        }
    }, [userInfo]);

    useEffect(() => {
        if (
            !newUserInfo.nickName ||
            newUserInfo.nickName === userInfo?.nickName
        )
            return;

        const timer = setTimeout(() => {
            handleNicknameValidation(newUserInfo.nickName);
        }, 2000);

        return () => clearTimeout(timer);
    }, [newUserInfo.nickName, userInfo]);

    const handleNicknameValidation = async (nickname: string) => {
        const response = await checkNicknameRedundancy(nickname);
        setIsNicknameValid(!!response.usable);
    };

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

        if (value.length > 10 && value.length > newUserInfo.birthDate.length) {
            return;
        }

        setNewUserInfo({ ...newUserInfo, birthDate: value });

        if (value.length >= 10) {
            const errorMessage = validateBirthDate(value);
            setBirthDateError(errorMessage);
        }
    };

    const handleEditButtonClick = async () => {
        const { nickName, birthDate, gender } = newUserInfo;
        try {
            await updateUserInfoMutation.mutateAsync({
                ...(nickName === userInfo.nickName ? {} : { nickName }),
                ...(birthDate ? { birthDate } : {}),
                ...(gender ? { gender } : {}),
            });
            toast('회원 정보가 수정되었습니다.');
        } catch {
            alert('회원 정보를 수정하는 중 에러가 발생했습니다.');
        }
    };

    return (
        <div className="pb-30">
            <Header type="title" title="확인/수정하기" />

            <div className="space-y-9 px-5 py-6">
                <NicknameSection
                    nickName={newUserInfo.nickName}
                    isNicknameValid={isNicknameValid}
                    onNicknameChange={(e) =>
                        setNewUserInfo({
                            ...newUserInfo,
                            nickName: e.target.value,
                        })
                    }
                />
                <EmailSection email={userInfo.email} />
                <BirthDateSection
                    birthDate={newUserInfo.birthDate}
                    birthDateError={birthDateError}
                    onBirthDateChange={handleBirthDateChange}
                />
                <GenderSection
                    gender={newUserInfo.gender}
                    onGenderChange={(gender) =>
                        setNewUserInfo({ ...newUserInfo, gender })
                    }
                />
            </div>

            <div className="fixed bottom-0 w-full max-w-2xl px-5 py-8">
                <button
                    disabled={
                        isNicknameValid === false ||
                        newUserInfo.nickName.length === 0 ||
                        !!birthDateError
                    }
                    onClick={handleEditButtonClick}
                    className="disabled:bg-button-disabled text-body-02 w-full rounded-sm bg-black py-4 text-white"
                >
                    수정하기
                </button>
            </div>
        </div>
    );
}
