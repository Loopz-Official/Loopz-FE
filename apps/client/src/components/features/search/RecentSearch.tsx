'use client';

import { useEffect, useState } from 'react';

import { SearchHistoryResponse } from '@/schemas/search';
import { getSearchHistory } from '@/services/api/search';

import KeywordList from './KeywordList';

export default function RecentSearch() {
    const [histories, setHistories] = useState<SearchHistoryResponse>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getHistories = async () => {
            try {
                const response = await getSearchHistory();
                setHistories(response);
            } catch {
                setError(true);
            }
        };

        getHistories();
    }, []);

    if (error) return null;

    return (
        <div className="space-y-2.5">
            <div className="flex items-center justify-between pr-5">
                <span className="text-body-03 font-semibold">최근 검색어</span>
                <button className="text-caption-01 text-gray-regular">
                    전체 삭제
                </button>
            </div>

            <div>
                <KeywordList variant="recent" keywords={histories} />
            </div>
        </div>
    );
}
