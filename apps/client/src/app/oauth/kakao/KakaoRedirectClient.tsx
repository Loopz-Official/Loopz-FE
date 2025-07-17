'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { setTokenCookie, setUserInfoCookie } from '@/auth/cookie/setCookie';
import OAuthRedirect from '@/components/features/oauth/OAuthRedirect';
import { useUserInfoStore } from '@/hooks/stores/useUserInfoStore';
import { postKakaoAuthCode } from '@/services/api/oauth';

export default function KakaoRedirectClient() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { setUserInfo, clearUserInfo } = useUserInfoStore();

    useEffect(() => {
        const handleKakaoLogin = async () => {
            const code = searchParams.get('code');

            if (code) {
                const serverResponse = await postKakaoAuthCode(code);
                if (!serverResponse) return;

                const { data: loginUserInfo, accessToken } = serverResponse;

                setUserInfo(loginUserInfo);

                // 🍪 쿠키 관련 임시 설정 (추후 refactor 필요)
                setTokenCookie(accessToken);
                setUserInfoCookie();
                clearUserInfo();

                router.push(
                    loginUserInfo.enabled
                        ? '/main'
                        : loginUserInfo.nickName
                          ? '/auth/terms'
                          : '/auth/nickname'
                );
            }
        };

        handleKakaoLogin();
    }, [searchParams, router, setUserInfo, clearUserInfo]);

    return <OAuthRedirect />;
}
