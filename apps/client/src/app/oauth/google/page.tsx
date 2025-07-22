'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { setAuthCookies } from '@/auth/cookie/setCookie';
import OAuthRedirect from '@/components/features/oauth/OAuthRedirect';
import { useUserEmailStore } from '@/hooks/stores/useUserEmailStore';
import { getGoogleToken, postGoogleToken } from '@/services/api/oauth';

export default function GoogleRedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { setUserEmail } = useUserEmailStore();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            const code = searchParams.get('code');

            if (code) {
                try {
                    const tokenResponse = await getGoogleToken(code);
                    if (!tokenResponse) {
                        console.error('Failed to get Google token');
                        router.push('/auth/login');
                        return;
                    }

                    const serverResponse = await postGoogleToken(tokenResponse);
                    if (!serverResponse) {
                        console.error('Failed to post Google token to server');
                        router.push('/auth/login');
                        return;
                    }

                    const { data: loginUserInfo, accessToken } = serverResponse;

                    // 1. 먼저 쿠키 설정 (race condition 방지)
                    setAuthCookies({
                        accessToken,
                        enabled: loginUserInfo.enabled,
                        nickName: loginUserInfo.nickName,
                    });

                    // 2. nickname이 없는 경우에만 전역 상태 업데이트
                    if (!loginUserInfo.nickName) {
                        setUserEmail(loginUserInfo.email);
                    }

                    // 3. 약간의 지연 후 리다이렉트 (쿠키 설정 안정화)
                    setTimeout(() => {
                        router.push(
                            loginUserInfo.enabled
                                ? '/main'
                                : loginUserInfo.nickName
                                  ? '/auth/terms'
                                  : '/auth/nickname'
                        );
                    }, 100);
                } catch (error) {
                    console.error('Google login error:', error);
                    router.push('/auth/login');
                }
            }
        };

        handleGoogleLogin();
    }, [searchParams, router, setUserEmail]);

    return <OAuthRedirect />;
}
