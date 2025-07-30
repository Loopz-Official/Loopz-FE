'use client';

import { useRouter } from 'next/navigation';

import KeywordList from './KeywordList';

const keywords = [
    { searchId: '', keyword: '매거진' },
    { searchId: '', keyword: '의자' },
    { searchId: '', keyword: '전신 거울' },
    { searchId: '', keyword: '러그' },
    { searchId: '', keyword: '이것 저것' },
    { searchId: '', keyword: '이 것 저 것' },
    { searchId: '', keyword: '이것' },
    { searchId: '', keyword: '저것' },
    { searchId: '', keyword: 'dlrjtwjrjt' },
];

export default function RecentSearch() {
    const router = useRouter();

    return (
        <div className="space-y-2.5">
            <div className="flex items-center justify-between pr-5">
                <span className="text-body-03 font-semibold">최근 검색어</span>
                <button className="text-caption-01 text-gray-regular">
                    전체 삭제
                </button>
            </div>

            <div>
                <KeywordList
                    variant="recent"
                    keywords={keywords}
                    onClick={(keyword: string) =>
                        router.push(`/search?keyword=${keyword}`)
                    }
                />
            </div>
        </div>
    );
}
