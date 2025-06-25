'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import UserInfoInput from '@/components/features/auth/UserInfoInput';
import Header from '@/components/layouts/Header';

export default function NicknamePage() {
    const router = useRouter();

    const [nickname, setNickname] = useState<string>('');

    return (
        <div className="flex h-full w-full flex-col">
            <Header type="title" title="회원가입" />
            <div className="flex grow flex-col justify-between pb-16 pt-6">
                <section className="flex h-fit w-full flex-col gap-8">
                    <UserInfoInput
                        label="email"
                        userInfo="happyuri816@naver.com"
                    />
                    <UserInfoInput
                        label="nickname"
                        userInfo={nickname}
                        setNickname={setNickname}
                    />
                </section>
                <BottomButton
                    text="다음"
                    isDisabled={false}
                    position="static"
                    onClick={() => router.push('/auth/terms')}
                />
            </div>
        </div>
    );
}
