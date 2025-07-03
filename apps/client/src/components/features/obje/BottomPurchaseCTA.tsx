'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import BottomButton from '@/components/common/BottomButton';
import LikeIconDynamic from '@/components/icons/LikeIcon';
import { useAddCartMutation } from '@/hooks/mutations/useCartMutation';
import { useToAddObjectStore } from '@/hooks/stores/useToAddObject';
import { CartIcon } from '@/icons/Header';

import BottomSheet from './BottomSheet';

const BottomPurchaseCTA = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
    // const [isCartToastRender, setIsCartToastRender] = useState<boolean>(false);

    const addCartMutation = useAddCartMutation();

    const handleLike = () => setIsLiked((prev) => !prev);
    const handleCart = async () => {
        await addCartMutation.mutateAsync({
            objectId: useToAddObjectStore.getState().objectId,
            quantity: 1,
        });
        toast.success('장바구니에 상품을 담았어요!');
    };

    const likeIconStyling = isLiked
        ? { fill: '#FF5A2D', stroke: 'none' }
        : { fill: 'none', stroke: '#151515' };

    const CTA_ICONS = [
        {
            // fill 색상 변경
            icon: () => (
                <LikeIconDynamic
                    fill={likeIconStyling.fill}
                    stroke={likeIconStyling.stroke}
                />
            ),
            name: 'like',
            onClick: handleLike,
        },
        {
            icon: () => <CartIcon />,
            name: 'cart',
            onClick: handleCart,
        },
    ];

    return (
        <div className="fixed bottom-0 z-10 w-full max-w-2xl bg-white">
            <BottomButton
                text="구매하기"
                isDisabled={false}
                onClick={() => setIsBottomSheetOpen(true)}
                isBottomSheetOpen={isBottomSheetOpen}
            >
                {!isBottomSheetOpen && (
                    <ul className="flex items-center gap-4">
                        {CTA_ICONS.map((item) => (
                            <li key={item.name}>
                                <button onClick={item.onClick}>
                                    {item.icon()}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </BottomButton>
            {isBottomSheetOpen && (
                <>
                    <BottomSheet />
                    <div
                        className="fixed inset-0 z-10 bg-[#111111]/60 bg-opacity-50 transition-opacity"
                        onClick={() => setIsBottomSheetOpen(false)}
                    />
                </>
            )}
        </div>
    );
};

export default BottomPurchaseCTA;
