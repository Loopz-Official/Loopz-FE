import Link from 'next/link';

import * as I from '@/icons/Mypage';

export default function Banner() {
    return (
        <Link
            href="/like"
            className="bg-gray-12 rounded-xs mb-5 grid grid-cols-[auto_1fr] gap-4"
        >
            <div className="bg-gray-02 rounded-l-xs relative aspect-square h-full w-auto bg-[url('/mypage-banner.svg')] bg-[11px_15px] bg-no-repeat pl-3 pt-4">
                <I.HeartIcon className="absolute left-5 top-7 z-10" />
            </div>
            <div className="py-5">
                <div className="text-body-03 font-semibold">
                    찜한 상품만 모아보는 나만의 리스트
                </div>
                <div className="text-caption-01 text-gray-dark">
                    관심있는 아이템을 한 곳에 모아보세요
                </div>
            </div>
        </Link>
    );
}
