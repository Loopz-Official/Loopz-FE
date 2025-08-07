'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { clearUserInfoCookie } from '@/auth/cookie/clearCookie';
import { CheckCircleComplete } from '@/icons/Common';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            clearUserInfoCookie();
            localStorage.clear();
            router.push('/main');
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="z-100 fixed left-0 top-0 flex h-dvh w-full flex-col items-center justify-center bg-white">
            <CheckCircleComplete />
            <span className="text-headline-02 mt-6">
                탈퇴가 완료되었습니다.
            </span>
        </div>
    );
}
