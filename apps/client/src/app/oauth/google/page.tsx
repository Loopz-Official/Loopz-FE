'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { getGoogleToken, postGoogleToken } from '@/services/api/oauth';
import { useUserInfo } from '@/stores/userInfo';

export default function GoogleRedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchGoogleToken = async () => {
            const code = searchParams.get('code');
            if (code) {
                const tokenResponse = await getGoogleToken(code);
                if (!tokenResponse) return;

                const serverResponse = await postGoogleToken(tokenResponse);
                if (!serverResponse) return;

                const { data: userInfo, accessToken } = serverResponse;

                localStorage.setItem('access-token', accessToken);
                useUserInfo.getState().setUserInfo(userInfo);
                router.push('/auth/nickname');
            }
        };

        fetchGoogleToken();
    }, [searchParams, router]);

    return <div>Redirecting...</div>;
}
