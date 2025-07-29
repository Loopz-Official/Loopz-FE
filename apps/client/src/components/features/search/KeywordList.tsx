'use client';

import clsx from 'clsx';

import * as I from '@/icons/Search';

export interface Keyword {
    searchId: string;
    keyword: string;
}

type keywordListProps = {
    variant: 'recent' | 'recommanded';
    keywords: Keyword[];
    onClick: (keyword: string) => void;
};

export default function KeywordList({
    variant,
    keywords,
    onClick,
}: keywordListProps) {
    const isRecentKeyword = variant === 'recent';

    return (
        <div
            className="flex w-full gap-x-1.5 overflow-x-scroll pr-5"
            style={{ scrollbarWidth: 'none' }}
        >
            {keywords.map(({ keyword }) => (
                <button
                    key={keyword}
                    onClick={() => {
                        onClick(keyword);
                    }}
                    className={clsx(
                        'text-body-03 text-gray-dark flex w-max items-center gap-1.5 whitespace-nowrap rounded-full border py-1 tracking-normal',
                        isRecentKeyword
                            ? 'bg-gray-regular border-gray-light px-2.5'
                            : 'border-gray-regular bg-white px-[0.875rem]'
                    )}
                >
                    {keyword}

                    {isRecentKeyword && (
                        <div role="button" tabIndex={0}>
                            <I.CloseIcon />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
}
