import { Suspense } from 'react';

import RecentSearch from '@/components/features/search/RecentSearch';
import SearchBar from '@/components/features/search/SearchBar';
import SearchBoard from '@/components/features/search/SearchBoard';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ keyword: string }>;
}) {
    const { keyword } = await searchParams;

    return (
        <div>
            <Suspense>
                <SearchBar />
            </Suspense>

            {keyword ? (
                <SearchBoard keyword={keyword} />
            ) : (
                <div className="pl-5 pt-6">
                    <RecentSearch />
                    {/* 추천 검색어 추가 */}
                </div>
            )}
        </div>
    );
}
