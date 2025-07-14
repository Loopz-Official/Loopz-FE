'use client';

import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import LikeIconDynamic from '@/components/icons/LikeIcon';
import { useUpdateCartItem } from '@/hooks/mutations/useCartMutation';
import { useLikeToggleMutation } from '@/hooks/mutations/useObjectMutation';
import { useToAddObjectStore } from '@/hooks/stores/useToAddObject';
import { CartIcon } from '@/icons/Header';
import { ObjectDetailInfo } from '@/schemas/object/object';
import { getLikeIconStyling } from '@/utils/likeIconStyling';

import BottomSheet from './BottomSheet';

type BottomPurchaseCTAProps = {
    objectId: string;
    objectDetail: ObjectDetailInfo;
};

const BottomPurchaseCTA = ({
    objectId,
    objectDetail,
}: BottomPurchaseCTAProps) => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

    const addCartMutation = useUpdateCartItem();
    const likeToggleMutation = useLikeToggleMutation();

    if (!objectDetail) return <div>오브제 상세 정보가 존재하지 않습니다.</div>;

    const isSoldOut = objectDetail.stock === 0;
    const isLiked = objectDetail.liked;

    const handleLike = () => {
        likeToggleMutation.mutate({ objectId, currentLiked: isLiked });
    };

    const handleCart = () => {
        addCartMutation.mutate({
            objectId: useToAddObjectStore.getState().objectId,
            quantity: 1,
        });
    };

    const likeIconStyling = getLikeIconStyling(isLiked);

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
        <div className="fixed bottom-0 z-50 w-full max-w-2xl bg-white">
            <BottomButton
                text={isSoldOut ? '판매 완료' : '구매하기'}
                isDisabled={isSoldOut}
                onClick={() => setIsBottomSheetOpen(true)}
                isBottomSheetOpen={isBottomSheetOpen}
            >
                <ul className="flex items-center gap-4">
                    {CTA_ICONS.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={item.onClick}
                                disabled={isSoldOut && item.name === 'cart'}
                            >
                                {item.icon()}
                            </button>
                        </li>
                    ))}
                </ul>
            </BottomButton>
            {isBottomSheetOpen && (
                <>
                    <BottomSheet
                        objectId={objectId}
                        objectDetail={objectDetail}
                    />
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
