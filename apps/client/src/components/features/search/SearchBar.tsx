'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import * as I from '@/icons/Header';
import { RelativeObjectResponse } from '@/schemas/search';
import { getRelativeObject } from '@/services/api/search';
import { splitTextByKeyword } from '@/utils/splitTextByKeyword';

export default function SearchBar({
    keyword: paramsKeyword,
}: {
    keyword: string;
}) {
    const [isSearching, setIsSearching] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [relativeObjects, setRelativeObjects] =
        useState<RelativeObjectResponse>([]);
    const router = useRouter();

    useEffect(() => {
        if (!keyword) {
            setIsSearching(false);
            return;
        }

        if (keyword === paramsKeyword) {
            return;
        }

        const timer = setTimeout(() => {
            autocomplete(keyword);
        }, 1000);

        return () => clearTimeout(timer);
    }, [keyword, paramsKeyword]);

    const autocomplete = async (keyword: string) => {
        const response = await getRelativeObject(keyword);
        setRelativeObjects(response);
        setIsSearching(true);
    };

    const handleBackButtonClick = () => {
        router.back();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword) {
            router.push(`/search?keyword=${keyword}`);
            setIsSearching(false);
        }
    };

    useEffect(() => {
        setKeyword(paramsKeyword ?? '');
    }, [paramsKeyword]);

    return (
        <>
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

            {isSearching && relativeObjects.length > 0 && (
                <div className="fixed top-14 z-20 h-full w-full bg-white pt-4">
                    {relativeObjects.map(({ objectName }) => (
                        <Link
                            key={objectName}
                            href={`/search?keyword=${objectName}`}
                            onClick={() => setIsSearching(false)}
                            className="text-body-03 line-clamp-1 w-full px-5 py-3 font-normal"
                        >
                            {splitTextByKeyword(keyword, objectName).map(
                                (part) =>
                                    part === keyword ? (
                                        <span key={part} className="text-point">
                                            {part}
                                        </span>
                                    ) : (
                                        <span key={part}>{part}</span>
                                    )
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
