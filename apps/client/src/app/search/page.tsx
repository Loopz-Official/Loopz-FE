'use client';

import { Suspense } from 'react';

import SearchBar from '@/components/features/search/SearchBar';

export default function Page() {
    return (
        <div>
            <Suspense>
                <SearchBar />
            </Suspense>
        </div>
    );
}
