import Link from 'next/link';

import Button from '@/components/features/mypage/Button';
import CustomLink from '@/components/features/mypage/CustomLink';
import * as I from '@/icons/Mypage';

const MYPAGE_LINKS = [
    {
        label: '주문 내역',
        href: '',
    },
    {
        label: '취소/반품 내역',
        href: '',
    },
    {
        label: '회원 정보 수정',
        href: '',
    },
    {
        label: '1:1 문의하기',
        href: '',
    },
];

const MYPAGE_BUTTONS = ['로그아웃', '탈퇴하기'] as const;

export default function MyPage() {
    return (
        <div>
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

            <div className="mb-10">
                {MYPAGE_LINKS.map(({ label, href }) => (
                    <CustomLink key={label} href={href}>
                        {label}
                    </CustomLink>
                ))}
            </div>

            <div className="mb-8 space-x-2">
                {MYPAGE_BUTTONS.map((btn) => (
                    <Button key={btn} type={btn} />
                ))}
            </div>
        </div>
    );
}
