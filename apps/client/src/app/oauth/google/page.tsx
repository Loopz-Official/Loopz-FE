'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { setTokenCookie, setUserInfoCookie } from '@/auth/cookie/setCookie';
import OAuthRedirect from '@/components/features/oauth/OAuthRedirect';
import { useUserInfoStore } from '@/hooks/stores/useUserInfoStore';
import { getGoogleToken, postGoogleToken } from '@/services/api/oauth';

export default function GoogleRedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { setUserInfo } = useUserInfoStore();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            const code = searchParams.get('code');

            if (code) {
                const tokenResponse = await getGoogleToken(code);
                if (!tokenResponse) return;

                const serverResponse = await postGoogleToken(tokenResponse);
                if (!serverResponse) return;

                const { data: loginUserInfo, accessToken } = serverResponse;

                setUserInfo(loginUserInfo);

                // 🍪 쿠키 관련 임시 설정 (추후 refactor 필요)
                setTokenCookie(accessToken);
                setUserInfoCookie();

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
    }, [searchParams, router, setUserInfo]);

    return <OAuthRedirect />;
}
