'use client';

import { useEffect, useState } from 'react';

import { useCartInquiryQuery } from '@/hooks/queries/useCartQuery';

const CartCount = () => {
    const [cartCount, setCartCount] = useState<number>(0);

    // 장바구니 상품 개수
    const { data: cartInfos } = useCartInquiryQuery();

    useEffect(() => {
        setCartCount(cartInfos?.availableItems.length || 0);
    }, [cartInfos]);

    return (
        <div className="absolute bottom-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-lg bg-black px-1 text-[10px] font-normal tracking-normal text-white">
            {cartCount}
        </div>
    );
};

export default CartCount;
