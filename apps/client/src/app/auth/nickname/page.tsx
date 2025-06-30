'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { setUserInfoCookie } from '@/auth/cookie/setCookie';
import BottomButton from '@/components/common/BottomButton';
import UserInfoInput from '@/components/features/auth/UserInfoInput';
import { useUserInfo } from '@/hooks/stores/userInfo';
import { checkNicknameRedundancy, updateNickname } from '@/services/api/auth';

export default function NicknamePage() {
    const router = useRouter();

    const [nickname, setNickname] = useState<string>('');
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

    useEffect(() => {
        if (!nickname) return;

        setIsChecking(true);
        const timer = setTimeout(() => {
            handleNicknameValidation(nickname);
        }, 2000);

        // 닉네임이 바뀌면 타이머 초기화
        return () => clearTimeout(timer);
    }, [nickname]);

    const handleNicknameValidation = async (nickname: string) => {
        setIsNicknameValid(false);

        const response = await checkNicknameRedundancy(nickname);

        // console.log('checkNicknameRedundancy Response: ', response);

        if (response.usable) {
            setIsNicknameValid(true);
            setIsChecking(false);
        }
    };

    const handleNicknameSubmit = async () => {
        const nicknameResponse = await updateNickname(nickname);
        if (!nicknameResponse) return;

        const { data: nicknameUserInfo, status } = nicknameResponse;

        if (status === 200) {
            useUserInfo.getState().setUserInfo(nicknameUserInfo);
            setUserInfoCookie();
            router.push('/auth/terms');
        }
    };

    return (
        <>
            <section className="flex h-fit w-full flex-col gap-8">
                <UserInfoInput
                    label="email"
                    userInfo={useUserInfo.getState().email}
                />
                <UserInfoInput
                    label="nickname"
                    userInfo={nickname}
                    nickname={nickname}
                    setNickname={setNickname}
                    isChecking={isChecking}
                    isNicknameValid={isNicknameValid}
                />
            </section>
            <BottomButton
                text="다음"
                isDisabled={
                    nickname.length === 0 || (isChecking && !isNicknameValid)
                }
                position="static"
                onClick={handleNicknameSubmit}
            />
        </>
    );
}
