'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import * as I from '@/icons/Header';

export default function SearchBar() {
    const [keyword, setKeyword] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleBackButtonClick = () => {
        router.back();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?keyword=${keyword}`);
    };

    useEffect(() => {
        setKeyword(searchParams.get('keyword') ?? '');
    }, [searchParams]);

    return (
        <form
            onSubmit={handleSubmit}
            className="border-gray-regular sticky top-0 z-50 grid h-14 w-full grid-cols-[auto_1fr_auto] border-b bg-white px-5 py-[0.875rem]"
        >
            <button type="button" onClick={handleBackButtonClick}>
                <I.BackIcon />
            </button>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="구매하고 싶은 제품 유형을 검색해 보세요!"
                className="placeholder:text-disabled text-body-03 ml-3 mr-auto w-full max-w-80 placeholder:font-normal"
            />
            <button>
                <I.SearchIcon />
            </button>
        </form>
    );
}
