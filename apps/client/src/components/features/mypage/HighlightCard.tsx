import Image from 'next/image';
import Link from 'next/link';

export default function HighlightCard() {
    return (
        <Link
            href="/like"
            className="bg-gray-12 rounded-xs mb-5 grid grid-cols-[auto_1fr] overflow-hidden"
        >
            <Image
                src={'/profile/like-banner-img.png'}
                alt="Like Banner"
                width={80}
                height={80}
                priority
            />
            <div className="px-4 py-5">
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
