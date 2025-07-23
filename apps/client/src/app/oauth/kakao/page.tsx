'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { setAuthCookies } from '@/auth/cookie/setCookie';
import OAuthRedirect from '@/components/features/oauth/OAuthRedirect';
import { useUserEmailStore } from '@/hooks/stores/useUserEmailStore';
import { postKakaoAuthCode } from '@/services/api/oauth';

export default function KakaoRedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { setUserEmail } = useUserEmailStore();

    useEffect(() => {
        const handleKakaoLogin = async () => {
            const code = searchParams.get('code');

            if (code) {
                try {
                    const serverResponse = await postKakaoAuthCode(code);
                    if (!serverResponse) {
                        console.error(
                            'Failed to post Kakao auth code to server'
                        );
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

                    // 3. 리다이렉트 (쿠키 설정 후 즉시 실행)
                    router.push(
                        loginUserInfo.enabled
                            ? '/main'
                            : loginUserInfo.nickName
                              ? '/auth/terms'
                              : '/auth/nickname'
                    );
                } catch (error) {
                    console.error('Kakao login error:', error);
                    router.push('/auth/login');
                }
            }
        };

        handleKakaoLogin();
    }, [searchParams, router, setUserEmail]);

    return <OAuthRedirect />;
}
