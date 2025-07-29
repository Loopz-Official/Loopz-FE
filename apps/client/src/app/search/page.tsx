'use client';

import { Suspense } from 'react';

import RecentSearch from '@/components/features/search/RecentSearch';
import SearchBar from '@/components/features/search/SearchBar';

export default function Page() {
    return (
        <div>
            <Suspense>
                <SearchBar />
            </Suspense>

            <div className="pl-5 pt-6">
                <RecentSearch />
                {/* 추천 검색어 추가 */}
            </div>
        </div>
    );
}
