'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { CheckCircle } from '@/icons/Auth';

export default function SignupComplete() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/main');
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center">
            <CheckCircle />
            <span className="text-headline-02 mt-6">가입이 완료되었어요!</span>
        </div>
    );
}
