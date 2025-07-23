'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { setAuthCookies } from '@/auth/cookie/setCookie';
import BottomFixedButton from '@/components/common/Button/BottomFixed';
import UserInfoInput from '@/components/features/auth/UserInfoInput';
import { useUserEmailStore } from '@/hooks/stores/useUserEmailStore';
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
        try {
            const { usable } = await checkNicknameRedundancy(nickname);
            setIsNicknameValid(usable);
        } catch {
            setIsNicknameValid(false);
        } finally {
            setIsChecking(false);
        }
    };

    const handleNicknameSubmit = async () => {
        const nicknameResponse = await updateNickname(nickname);
        if (!nicknameResponse) return;

        const { data: nicknameUserInfo, status } = nicknameResponse;

        if (status === 200) {
            useUserEmailStore.getState().setUserEmail(nicknameUserInfo.email);
            setAuthCookies({
                nickName: nicknameUserInfo.nickName,
            });
            router.push('/auth/terms');
        }
    };

    const isDisabled = nickname.length === 0 || isChecking || !isNicknameValid;

    return (
        <>
            <section className="flex h-fit w-full flex-col gap-8">
                <UserInfoInput
                    label="email"
                    userInfo={useUserEmailStore.getState().email}
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
            <BottomFixedButton
                text="다음"
                isDisabled={isDisabled}
                position="static"
                onClick={handleNicknameSubmit}
            />
        </>
    );
}
