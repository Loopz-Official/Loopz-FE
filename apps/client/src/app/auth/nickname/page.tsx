'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import UserInfoInput from '@/components/features/auth/UserInfoInput';
import { checkNicknameRedundancy } from '@/services/api/auth';
import { useUserInfo } from '@/stores/userInfo';

export default function NicknamePage() {
    const router = useRouter();

    const [nickname, setNickname] = useState<string>('');
    const [isChecking, setIsChecking] = useState<boolean>(false);

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
        setIsChecking(true);
        const response = await checkNicknameRedundancy(nickname);

        // console.log('checkNicknameRedundancy Response: ', response);

        if (response.usable) {
            setIsChecking(false);
        }
    };

    const handleNicknameSubmit = () => {
        // useUserInfo.getState().setUserInfo({
        //     nickName: nickname,
        // });
        router.push('/auth/terms');
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
                    setNickname={setNickname}
                />
            </section>
            <BottomButton
                text="다음"
                isDisabled={nickname.length === 0 || isChecking}
                position="static"
                onClick={handleNicknameSubmit}
            />
        </>
    );
}
