'use client';

import { useRouter } from 'next/navigation';

const PurchaseNowButton = ({ onClick }: { onClick: () => void }) => {
    const router = useRouter();

    const handleClick = () => {
        onClick();
        router.push('/order/form'); // 이 부분도 semantic이 detail로 분류되어야 한다는게 어색함
    };

    return (
        <button
            className="text-caption-01 rounded-xs flex items-center justify-center bg-black px-2.5 py-2 text-white"
            onClick={handleClick}
        >
            바로 구매하기
        </button>
    );
};

export default PurchaseNowButton;
