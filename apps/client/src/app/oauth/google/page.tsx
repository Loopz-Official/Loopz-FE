'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { getGoogleToken, postGoogleToken } from '@/services/api/oauth';
import { useUserInfo } from '@/stores/userInfo';

export default function GoogleRedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            const code = searchParams.get('code');
            if (code) {
                const tokenResponse = await getGoogleToken(code);
                if (!tokenResponse) return;

                const serverResponse = await postGoogleToken(tokenResponse);
                if (!serverResponse) return;

                const { data: loginUserInfo, accessToken } = serverResponse;

                localStorage.setItem('access-token', accessToken);
                useUserInfo.getState().setUserInfo(loginUserInfo);

                router.push(
                    loginUserInfo.enabled
                        ? '/main'
                        : loginUserInfo.nickName
                          ? '/auth/terms'
                          : '/auth/nickname'
                );
            }
        };

        handleGoogleLogin();
    }, [searchParams, router]);

    return <div>Redirecting...</div>;
}
