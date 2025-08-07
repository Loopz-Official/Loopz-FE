'use client';

import { useRouter } from 'next/navigation';

import { clearUserInfoCookie } from '@/auth/cookie/clearCookie';
import { logout } from '@/services/api/auth';

export default function AccountActionButton({
    type,
}: {
    type: '로그아웃' | '탈퇴하기';
}) {
    const router = useRouter();

    const handleButtonClick = async () => {
        if (type === '로그아웃') {
            try {
                const response = await logout();

                if (response?.status === 200) {
                    clearUserInfoCookie();
                    localStorage.clear();
                    alert(response?.data.message);
                    window.location.href = '/';
                }
            } catch (error) {
                console.error(error);
                alert('로그아웃 중 문제가 발생했습니다.');
            }
        } else {
            router.push('/mypage/leave');
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
