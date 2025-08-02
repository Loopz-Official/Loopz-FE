'use client';

import { useEffect, useState } from 'react';

import { SearchHistoryResponse } from '@/schemas/search';
import {
    deleteAllSearchHistory,
    deleteSearchHistory,
    getSearchHistory,
} from '@/services/api/search';

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

    const handleDeleteButtonClick = async (searchId: string) => {
        try {
            await deleteSearchHistory(searchId);
            const filteredHistories = histories.filter(
                (history) => history.searchId !== searchId
            );
            setHistories(filteredHistories);
        } catch {
            alert('검색 기록을 삭제하는 중 문제가 발생했습니다.');
        }
    };

    const handleDeleteAllButtonClick = async () => {
        try {
            await deleteAllSearchHistory();
            setHistories([]);
        } catch {
            alert('검색 기록을 삭제하는 중 문제가 발생했습니다.');
        }
    };

    if (error || histories.length === 0) return null;

    return (
        <div className="space-y-2.5">
            <div className="flex items-center justify-between pr-5">
                <span className="text-body-03 font-semibold">최근 검색어</span>
                <button
                    onClick={handleDeleteAllButtonClick}
                    className="text-caption-01 text-gray-regular"
                >
                    전체 삭제
                </button>
            </div>

            <div>
                <KeywordList
                    variant="recent"
                    keywords={histories}
                    onDelete={handleDeleteButtonClick}
                />
            </div>
        </div>
    );
}
