'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { setTokenCookie, setUserInfoCookie } from '@/auth/cookie/setCookie';
import OAuthRedirect from '@/components/features/oauth/OAuthRedirect';
import { postKakaoAuthCode } from '@/services/api/oauth';
import { useUserInfo } from '@/stores/userInfo';

export default function KakaoRedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const handleKakaoLogin = async () => {
            const code = searchParams.get('code');

            if (code) {
                const serverResponse = await postKakaoAuthCode(code);
                if (!serverResponse) return;

                const { data: loginUserInfo, accessToken } = serverResponse;

                useUserInfo.getState().setUserInfo(loginUserInfo);

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

        handleKakaoLogin();
    }, [searchParams, router]);

    return <OAuthRedirect />;
}
