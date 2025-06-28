import { Suspense } from 'react';

import GoogleRedirectClient from './GoogleRedirectClient';

export default function GoogleRedirectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleRedirectClient />
        </Suspense>
    );
}
