'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { getGoogleToken, postGoogleToken } from '@/services/api/oauth';

export default function GoogleRedirectPage() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchGoogleToken = async () => {
            const code = searchParams.get('code');
            if (code) {
                const tokenResponse = await getGoogleToken(code);
                if (!tokenResponse) return;

                const serverResponse = await postGoogleToken(tokenResponse);
                if (!serverResponse) return;

                const { status } = serverResponse;

                if (status === 200) {
                    window.location.href = '/auth/nickname';
                }
            }
        };

        fetchGoogleToken();
    }, [searchParams]);

    return <div>Redirecting...</div>;
}
