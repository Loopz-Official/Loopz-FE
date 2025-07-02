import Image from 'next/image';

import CheckBox from '@/components/common/CheckBox';
import EditDeleteButton from '@/components/common/EditDeleteButton';

import PurchaseNowButton from './PurchaseNowButton';

const CartItem = () => {
    return (
        <div className="flex flex-col gap-2 border-b border-solid border-black pb-6">
            <section className="flex items-center justify-between">
                <CheckBox />
                <EditDeleteButton type="delete" />
            </section>

            <section className="flex justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-body-01 font-semibold">
                        빈티지 다이얼 전화기
                    </span>
                    <span className="text-caption-01 text-gray-dark">
                        21,000원
                    </span>
                </div>
                <Image
                    priority
                    src="/cart-item.jpg"
                    alt="cart-item"
                    width={70}
                    height={70}
                />
            </section>

            <section className="flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-caption-02 text-gray-regular">
                        최종 상품 금액
                    </span>
                    <span className="text-headline-04">21,000원</span>
                </div>
                <PurchaseNowButton />
            </section>
        </div>
    );
};

export default CartItem;
