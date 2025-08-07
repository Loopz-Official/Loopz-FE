'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import * as I from '@/icons/Search';

export interface Keyword {
    searchId: string;
    keyword: string;
}

type keywordListProps = {
    variant: 'recent' | 'recommanded';
    keywords: Keyword[];
    onDelete: (searchId: string) => void;
};

export default function KeywordList({
    variant,
    keywords,
    onDelete,
}: keywordListProps) {
    const isRecentKeyword = variant === 'recent';
    const router = useRouter();

    const handleDeleteButtonClick = (e: React.MouseEvent, searchId: string) => {
        e.stopPropagation();
        onDelete(searchId);
    };

    return (
        <div
            className="flex w-full gap-x-1.5 overflow-x-scroll pr-5"
            style={{ scrollbarWidth: 'none' }}
        >
            {keywords.map(({ keyword, searchId }) => (
                <button
                    key={searchId}
                    onClick={() => router.push(`/search?keyword=${keyword}`)}
                    className={clsx(
                        'text-body-03 text-gray-dark flex w-max items-center gap-1.5 whitespace-nowrap rounded-full border py-1 tracking-normal',
                        isRecentKeyword
                            ? 'bg-gray-regular border-gray-light px-2.5'
                            : 'border-gray-regular bg-white px-[0.875rem]'
                    )}
                >
                    {keyword}

                    {isRecentKeyword && (
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) =>
                                handleDeleteButtonClick(e, searchId)
                            }
                        >
                            <I.CloseIcon className="fill-gray-07" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
}
