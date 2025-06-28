import { Suspense } from 'react';

import KakaoRedirectClient from './KakaoRedirectClient';

export default function KakaoRedirectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <KakaoRedirectClient />
        </Suspense>
    );
}
