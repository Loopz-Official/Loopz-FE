import AddressSection from '@/components/features/order/form/AddressSection';

export default function Page() {
    return (
        <div>
            {/* 헤더 */}

            <div className="flex flex-col gap-8 px-5 pb-12 pt-2">
                {/* 배송지 정보 */}
                <div className="flex flex-col gap-3 border-t border-black pt-4">
                    <AddressSection />
                </div>

                {/* 주문 상품 */}
                <div className="flex flex-col gap-3 border-t border-black pt-4"></div>

                {/* 결제 금액 */}
                <div className="flex flex-col gap-3 border-t border-black pt-5"></div>

                {/* 약관 동의 */}
                <div className="flex flex-col gap-3 border-t border-black pt-5"></div>

                {/* 버튼 */}
                <div></div>
            </div>
        </div>
    );
}
