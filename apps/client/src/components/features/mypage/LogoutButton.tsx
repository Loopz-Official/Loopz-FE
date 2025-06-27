'use client';

import { clearUserInfoCookie } from '@/auth/cookie/clearCookie';
import { logout } from '@/services/api/auth';

const LogoutButton = () => {
    const handleLogoutClick = async () => {
        const response = await logout();

        if (response?.status === 200) {
            clearUserInfoCookie();
            localStorage.clear();
            alert(response?.data.message);
            window.location.href = '/';
        }
    };

    return (
        <button
            onClick={handleLogoutClick}
            className="border-status-red text-body-01 text-status-red bg-status-red/10 w-full rounded-md border border-solid py-2.5"
        >
            로그아웃
        </button>
    );
};

export default LogoutButton;
