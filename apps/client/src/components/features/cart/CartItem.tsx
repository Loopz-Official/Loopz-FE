'use client'; // remove after creation of order create API

import Image from 'next/image';

import CheckBox from '@/components/common/CheckBox';
import EditDeleteButton from '@/components/common/EditDeleteButton';
import { useSelectedProductsStore } from '@/hooks/stores/useSelectedProductsStore';
import { ObjectCommonInfo } from '@/schemas/object/object';
import { formatPrice } from '@/utils/formatPrice';

import OrderQuantity from '../obje/OrderQuantity';

import PurchaseNowButton from './PurchaseNowButton';

type CartItemProps = {
    itemInfo: ObjectCommonInfo;
    quantity: number;
    isChecked: boolean;
    toggleCheck: () => void;
    onEditQuantity: (delta: number) => void;
    onDelete: () => void;
};

const CartItem = ({
    itemInfo,
    quantity,
    isChecked,
    toggleCheck,
    onEditQuantity,
    onDelete,
}: CartItemProps) => {
    const formattedPrice = formatPrice(itemInfo.objectPrice);
    const formattedTotalPrice = formatPrice(itemInfo.objectPrice * quantity);

    const objeStock = itemInfo.stock ?? 0;

    const handleIncrease = () => {
        if (quantity < objeStock) onEditQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) onEditQuantity(quantity - 1);
    };

    const handlePurchaseNowClick = () => {
        // 주문 생성 API가 없어서 임시방편 (수정될 로직 - 서버 기준 데이터 fetching 필요 (for data intergrity))
        const selectedProduct = [
            {
                objectId: itemInfo.objectId,
                quantity,
            },
        ];
        useSelectedProductsStore
            .getState()
            .setSelectedProducts(selectedProduct);
    };

    return (
        <div className="flex flex-col gap-2 border-b border-solid border-black pb-6">
            <section className="flex items-center justify-between">
                <CheckBox isChecked={isChecked} onChange={toggleCheck} />
                <EditDeleteButton type="delete" onClick={onDelete} />
            </section>

            <section className="flex justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-body-01 font-semibold">
                        {itemInfo.objectName}
                    </span>
                    <span className="text-caption-01 text-gray-dark">
                        {formattedPrice}원
                    </span>
                </div>
                <Image
                    priority
                    src={itemInfo.imageUrl}
                    alt="cart-item"
                    width={70}
                    height={70}
                />
            </section>

            <OrderQuantity
                type="cart"
                stock={itemInfo.stock ?? 0} // 추후 itemInfo.stock으로 변경 필요
                count={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />

            <section className="flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-caption-02 text-gray-regular">
                        최종 상품 금액
                    </span>
                    <span className="text-headline-04">
                        {formattedTotalPrice}원
                    </span>
                </div>
                <PurchaseNowButton onClick={handlePurchaseNowClick} />
            </section>
        </div>
    );
};

export default CartItem;
