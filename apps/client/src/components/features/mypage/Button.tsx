'use client';

import { useRouter } from 'next/navigation';

import { logout } from '@/services/api/auth';

export default function Button({ type }: { type: '로그아웃' | '탈퇴하기' }) {
    const router = useRouter();

    const handleButtonClick = async () => {
        if (type === '로그아웃') {
            try {
                await logout();
                router.push('/main');
            } catch (error) {
                console.error(error);
                alert('로그아웃 중 문제가 발생했습니다.');
            }
        } else {
            alert('준비 중입니다.\n1:1 문의하기를 이용해 주세요.');
        }
    };

    return (
        <button
            onClick={handleButtonClick}
            className="text-body-02 border-gray-regular rounded-xs border px-2.5 py-1 font-normal"
        >
            {type}
        </button>
    );
}
