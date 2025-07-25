'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import BottomFixedButton from '@/components/common/Button/BottomFixed';
import UserInfoInput from '@/components/features/auth/UserInfoInput';
import BirthDateSection from '@/components/features/mypage/edit/BirthDateSection';
import GenderSection from '@/components/features/mypage/edit/GenderSection';
import { useUpdateUserInfoMutation } from '@/hooks/mutations/useUserMutation';
import { useUserInfoQuery } from '@/hooks/queries/useUserQuery';
import { GenderType } from '@/schemas/user';
import { checkNicknameRedundancy } from '@/services/api/auth';
import { validateBirthDate } from '@/utils/mypage/validateBirthDate';

// 사용자 정보 폼 타입 분리
type UserInfoForm = {
    nickName: string;
    birthDate: string;
    gender: GenderType;
};

export default function Page() {
    const { data: userInfoRaw, isLoading } = useUserInfoQuery();
    const updateUserInfoMutation = useUpdateUserInfoMutation();

    // userInfo를 UserInfoForm 타입으로 변환 (null/undefined 방지)
    const userInfo: UserInfoForm | undefined = useMemo(
        () =>
            userInfoRaw
                ? {
                      nickName: userInfoRaw.nickName,
                      birthDate: userInfoRaw.birthDate ?? '',
                      gender: userInfoRaw.gender ?? 'UNKNOWN',
                  }
                : undefined,
        [userInfoRaw]
    );

    const [newUserInfo, setNewUserInfo] = useState<UserInfoForm>({
        nickName: '',
        birthDate: '',
        gender: 'UNKNOWN',
    });
    const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(
        null
    );
    const [isCheckingNickname, setIsCheckingNickname] =
        useState<boolean>(false);
    const [birthDateError, setBirthDateError] = useState<string>('');

    // 변경 감지 함수 분리
    const isUserInfoUnchanged = (a: UserInfoForm, b: UserInfoForm) =>
        a.nickName === b.nickName &&
        a.birthDate === b.birthDate &&
        a.gender === b.gender;

    // 변경된 값만 추려내는 함수 분리
    const getChangedUserInfo = (
        newUserInfo: UserInfoForm,
        userInfo: UserInfoForm
    ): Partial<UserInfoForm> => {
        const params: Partial<UserInfoForm> = {};
        if (newUserInfo.nickName !== userInfo.nickName) {
            params.nickName = newUserInfo.nickName;
        }
        if (newUserInfo.birthDate !== userInfo.birthDate) {
            params.birthDate = newUserInfo.birthDate;
        }
        if (newUserInfo.gender !== userInfo.gender) {
            params.gender = newUserInfo.gender;
        }
        return params;
    };

    useEffect(() => {
        if (userInfo) {
            setNewUserInfo(userInfo);
        }
    }, [userInfo]);

    useEffect(() => {
        if (
            !newUserInfo.nickName ||
            newUserInfo.nickName === userInfo?.nickName
        ) {
            setIsNicknameValid(null); // 기존 닉네임이면 중복 검사 결과를 초기화
            return;
        }

        setIsCheckingNickname(true);
        const timer = setTimeout(() => {
            handleNicknameValidation(newUserInfo.nickName);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [newUserInfo.nickName, userInfo]);

    if (isLoading) return <div>Loading...</div>;
    if (!userInfo) return <div>회원 정보를 불러오는 데 실패했습니다.</div>;

    const handleNicknameValidation = async (nickname: string) => {
        const { usable } = await checkNicknameRedundancy(nickname);
        setIsNicknameValid(usable);
        setIsCheckingNickname(false);
    };

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

    const handleEditButtonClick = () => {
        if (isUserInfoUnchanged(newUserInfo, userInfo)) {
            toast.info('변경된 내용이 없습니다');
            return;
        }

        // 변경된 값만 추려서 전달
        const params = getChangedUserInfo(newUserInfo, userInfo);
        updateUserInfoMutation.mutate(params);
    };

    const isEditButtonDisabled =
        isNicknameValid === false ||
        isCheckingNickname ||
        newUserInfo.nickName.length === 0 ||
        !!birthDateError;

    return (
        <>
            <div className="space-y-9">
                <UserInfoInput
                    label="nickname"
                    userInfo={newUserInfo.nickName}
                    nickname={newUserInfo.nickName}
                    setNickname={(value) =>
                        setNewUserInfo({
                            ...newUserInfo,
                            nickName: value,
                        })
                    }
                    isChecking={isCheckingNickname}
                    isNicknameValid={isNicknameValid}
                    labelClassName="text-body-02"
                    inputClassName="text-body-01"
                />
                <UserInfoInput
                    label="email"
                    userInfo={userInfoRaw?.email ?? ''}
                    labelClassName="text-body-02"
                    inputClassName="text-body-01"
                />
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

            <BottomFixedButton
                text="수정하기"
                isDisabled={isEditButtonDisabled}
                onClick={handleEditButtonClick}
            />
        </>
    );
}
